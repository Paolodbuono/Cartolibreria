export const routes = [
  { name: 'Home', root: "/HomeView" },
  { name: 'Accedi', root: "/MyProfileView" },
  { name: 'Prenota appuntamento', root: "/AppuntamentoView" },
  { name: 'Chi Siamo', root: "/WhoAreWeView" },
  { name: 'Avvisi Importanti', root: "/NoticeView" },
  { name: 'Perchè sceglierci', root: "/WhyChoseUsView" },
  { name: 'I miei ordini', root: "/MyOrdersView" },
  { name: 'Adozioni', root: "/AdozioniView" },
  { name: 'E\' semplice ordinare e acquistare!', root: "/ComodamenteDaCasaView" },
  { name: 'Area riservata', root: "/MyProfileView" },
] as const;


export type ValidRoutes = typeof routes[number]['root'];

export type RoutesType = {
  name: string;
  root: ValidRoutes;
};