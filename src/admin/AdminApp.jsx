import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings2,
  ShoppingBag,
  UsersRound,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import './admin.css';

const demo = {
  reservations: [
    { time: '13:30', name: 'María González', guests: 2, table: 'Mesa 04', state: 'confirmada' },
    { time: '14:00', name: 'Álvaro Martín', guests: 4, table: 'Mesa 07', state: 'confirmada' },
    { time: '14:30', name: 'Clara y Daniel', guests: 2, table: 'Mesa 02', state: 'pendiente' },
    { time: '21:00', name: 'Lucía Fernández', guests: 6, table: 'Mesa 12', state: 'confirmada' },
  ],
  orders: [
    { id: '#1048', table: 'Mesa 06', detail: '2 principales · 1 postre', age: '12 min', state: 'en_preparacion' },
    { id: '#1047', table: 'Mesa 03', detail: '4 platos · 2 bebidas', age: '8 min', state: 'pendiente' },
    { id: '#1046', table: 'Mesa 09', detail: 'Menú degustación · 2 pax', age: 'servir ahora', state: 'servido' },
  ],
  stock: [
    { name: 'Tomate rosa', current: '1,2 kg', minimum: '3 kg', tone: 'critical' },
    { name: 'Aceite de oliva virgen', current: '2,4 L', minimum: '5 L', tone: 'warning' },
    { name: 'Arroz bomba', current: '3,1 kg', minimum: '4 kg', tone: 'warning' },
  ],
};

const modules = [
  { label: 'Resumen', icon: LayoutDashboard },
  { label: 'Reservas', icon: CalendarDays, count: 5 },
  { label: 'Pedidos', icon: ClipboardList, count: 2 },
  { label: 'Carta', icon: UtensilsCrossed },
  { label: 'Inventario', icon: Package, count: 3 },
  { label: 'Equipo', icon: UsersRound },
];

const stateLabels = { pendiente: 'Pendiente', confirmada: 'Confirmada', en_preparacion: 'En cocina', servido: 'Listo' };

export default function AdminApp() {
  const [active, setActive] = useState('Resumen');
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('Hoy');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState(demo);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/dashboard`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload) => {
        if (payload?.reservas || payload?.pedidos) {
          setData((current) => ({ ...current, api: payload }));
        }
      })
      .catch(() => {});
  }, []);

  const filteredReservations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? data.reservations.filter((item) => `${item.name} ${item.table}`.toLowerCase().includes(query)) : data.reservations;
  }, [search, data.reservations]);

  const stats = data.api;

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark"><UtensilsCrossed size={18} /></span>
          <span><b>elRest</b><small>control de sala</small></span>
          <button className="admin-icon-button admin-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú"><X size={18} /></button>
        </div>

        <div className="admin-sidebar-label">Operación</div>
        <nav className="admin-nav" aria-label="Módulos de administración">
          {modules.map(({ label, icon: Icon, count }) => (
            <button key={label} className={`admin-nav-item ${active === label ? 'is-active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false); }}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {count && <em>{count}</em>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <div className="admin-sidebar-label">Sistema</div>
          <button className="admin-nav-item"><Settings2 size={18} strokeWidth={1.8} /><span>Ajustes</span></button>
          <div className="admin-user"><span className="admin-avatar">AP</span><span><b>Ana Pérez</b><small>Gerente</small></span><ChevronRight size={16} /></div>
        </div>
      </aside>

      {mobileOpen && <button className="admin-backdrop" onClick={() => setMobileOpen(false)} aria-label="Cerrar navegación" />}

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-button admin-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menú"><Menu size={21} /></button>
          <div className="admin-breadcrumb"><span>elRest</span><ChevronRight size={15} /><b>{active}</b></div>
          <div className="admin-topbar-actions">
            <label className="admin-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar reservas, pedidos..." /></label>
            <button className="admin-icon-button admin-bell" aria-label="Notificaciones"><Bell size={19} /><i /></button>
            <span className="admin-top-avatar">AP</span>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-page-heading">
            <div><p className="admin-eyebrow">Lunes, 24 de noviembre de 2026</p><h1>Buenos días, Ana.</h1><p className="admin-muted">Esto es lo que ocurre hoy en el restaurante.</p></div>
            <button className="admin-outline-button"><CalendarDays size={16} /> Ver calendario <ChevronDown size={15} /></button>
          </section>

          {active === 'Resumen' ? <>
          <section className="admin-metrics" aria-label="Resumen del día">
            <Metric icon={CalendarDays} label="Reservas de hoy" value={stats?.reservas?.hoy ?? 18} detail={`${stats?.reservas?.pendientes ?? 5} pendientes de confirmar`} accent="sage" />
            <Metric icon={ShoppingBag} label="Pedidos abiertos" value={String(stats?.pedidos?.abiertos ?? 6).padStart(2, '0')} detail="Requieren atención" accent="terracotta" />
            <Metric icon={CircleDollarSign} label="Ventas del mes" value={`${Number(stats?.ventas?.total ?? 12480).toLocaleString('es-ES')} €`} detail="Total cobrado" accent="ink" />
            <Metric icon={Package} label="Alertas de stock" value={String(stats?.ingredientes?.bajo_stock ?? 3).padStart(2, '0')} detail="Revisar antes del servicio" accent="sand" />
          </section>

          <div className="admin-grid">
            <section className="admin-panel admin-reservations">
              <PanelHeading title="Agenda de reservas" eyebrow="Servicio de hoy" action="Ver todas" />
              <div className="admin-tabs"><button className={period === 'Hoy' ? 'is-active' : ''} onClick={() => setPeriod('Hoy')}>Hoy <span>18</span></button><button className={period === 'Mañana' ? 'is-active' : ''} onClick={() => setPeriod('Mañana')}>Mañana <span>11</span></button><button className={period === 'Semana' ? 'is-active' : ''} onClick={() => setPeriod('Semana')}>Esta semana</button></div>
              <div className="admin-reservation-list">
                {filteredReservations.map((reservation) => <div className="admin-reservation" key={`${reservation.time}-${reservation.name}`}><time>{reservation.time}</time><div className="admin-reservation-main"><b>{reservation.name}</b><span>{reservation.guests} personas · {reservation.table}</span></div><Status state={reservation.state} /></div>)}
                {!filteredReservations.length && <p className="admin-empty">No hay resultados para “{search}”.</p>}
              </div>
            </section>

            <section className="admin-panel admin-orders">
              <PanelHeading title="Cola de pedidos" eyebrow="Ahora en sala" action="Ver pedidos" />
              <div className="admin-order-list">{data.orders.map((order) => <div className="admin-order" key={order.id}><div className={`admin-order-icon ${order.state}`}><ClipboardList size={17} /></div><div className="admin-order-main"><div><b>{order.id}</b><span>{order.table}</span></div><p>{order.detail}</p></div><div className="admin-order-time"><span>{order.age}</span><Status state={order.state} /></div></div>)}</div>
            </section>
          </div>

          <div className="admin-grid admin-grid-bottom">
            <section className="admin-panel"><PanelHeading title="Inventario" eyebrow="Necesita atención" action="Gestionar stock" /><div className="admin-stock-list">{data.stock.map((item) => <div className="admin-stock" key={item.name}><div className={`admin-stock-dot ${item.tone}`} /><div><b>{item.name}</b><span>Mínimo recomendado: {item.minimum}</span></div><strong>{item.current}</strong><ChevronRight size={16} /></div>)}</div></section>
            <section className="admin-panel admin-menu-status"><PanelHeading title="Estado de la carta" eyebrow="Disponibilidad" action="Editar carta" /><div className="admin-menu-total"><span className="admin-menu-ring">24</span><div><b>platos activos</b><span>de 27 en carta</span></div></div><div className="admin-progress"><span style={{ width: '89%' }} /></div><div className="admin-menu-foot"><span><i className="dot dot-sage" />24 disponibles</span><span><i className="dot dot-terracotta" />3 agotados</span></div></section>
          </div>
          </> : <ModuleView active={active} data={data} search={search} />}
        </div>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, accent }) {
  return <article className={`admin-metric ${accent}`}><div className="admin-metric-top"><span>{label}</span><Icon size={18} /></div><strong>{value}</strong><small>{detail}</small></article>;
}

function PanelHeading({ title, eyebrow, action }) {
  return <div className="admin-panel-heading"><div><p className="admin-eyebrow">{eyebrow}</p><h2>{title}</h2></div><button className="admin-text-button">{action} <ChevronRight size={15} /></button></div>;
}

function Status({ state }) {
  return <span className={`admin-status ${state}`}><i />{stateLabels[state] || state}</span>;
}

function ModuleView({ active, data, search }) {
  const title = {
    Reservas: 'Todas las reservas',
    Pedidos: 'Pedidos del servicio',
    Carta: 'Carta y disponibilidad',
    Inventario: 'Control de inventario',
    Equipo: 'Equipo y turnos',
  }[active];

  if (active === 'Reservas') return <section className="admin-panel admin-module-view"><PanelHeading title={title} eyebrow="Gestión de reservas" action="Nueva reserva" /><div className="admin-module-list">{data.reservations.filter((item) => `${item.name} ${item.table}`.toLowerCase().includes(search.toLowerCase())).map((item) => <div className="admin-module-row" key={`${item.time}-${item.name}`}><div><b>{item.name}</b><span>{item.time} · {item.guests} personas · {item.table}</span></div><Status state={item.state} /><button className="admin-text-button">Ver <ChevronRight size={15} /></button></div>)}</div></section>;
  if (active === 'Pedidos') return <section className="admin-panel admin-module-view"><PanelHeading title={title} eyebrow="Seguimiento en sala" action="Nuevo pedido" /><div className="admin-module-list">{data.orders.map((item) => <div className="admin-module-row" key={item.id}><div><b>{item.id} · {item.table}</b><span>{item.detail} · {item.age}</span></div><Status state={item.state} /><button className="admin-text-button">Abrir <ChevronRight size={15} /></button></div>)}</div></section>;
  if (active === 'Inventario') return <section className="admin-panel admin-module-view"><PanelHeading title={title} eyebrow="Existencias y mínimos" action="Añadir ingrediente" /><div className="admin-module-list">{data.stock.map((item) => <div className="admin-module-row" key={item.name}><div><b>{item.name}</b><span>Proveedor pendiente de sincronizar · mínimo {item.minimum}</span></div><strong>{item.current}</strong><button className="admin-text-button">Editar <ChevronRight size={15} /></button></div>)}</div></section>;
  if (active === 'Carta') return <section className="admin-panel admin-module-view"><PanelHeading title={title} eyebrow="Platos, bebidas y menús" action="Nuevo elemento" /><div className="admin-card-grid"><div><span className="admin-module-kicker">Platos</span><b>{data.api?.platos?.total ?? 27}</b><small>{data.api?.platos?.disponibles ?? 24} disponibles</small></div><div><span className="admin-module-kicker">Menús</span><b>4</b><small>Activos esta temporada</small></div><div><span className="admin-module-kicker">Bebidas</span><b>9</b><small>Disponibles</small></div></div></section>;
  return <section className="admin-panel admin-module-view"><PanelHeading title={title} eyebrow="Personal activo" action="Añadir empleado" /><div className="admin-card-grid"><div><span className="admin-module-kicker">Empleados activos</span><b>10</b><small>En plantilla</small></div><div><span className="admin-module-kicker">Turno actual</span><b>4</b><small>Personas asignadas hoy</small></div><div><span className="admin-module-kicker">Próximo turno</span><b>20:00</b><small>Servicio de cena</small></div></div></section>;
}
