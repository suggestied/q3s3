// app/types/types.ts

export interface Machine {
  id: number;
  object: string;
  naam: string;
  omschrijving: string;
  boom_volgorde: number;
  stamkaart: string;
  treeviewtype_id: number;
  serienummer: string;
  bouwjaar: string;
  actief: number;
  wijzigactief: number;
  vrijgegeven: number;
  installatiedatum: number;
  garantietot: number;
  aanschafwaarde: number;
  afschrijving: number;
  jaarafschrijving: number;
  afschrijvingeen: number;
  budgetvorig: number;
  budgetnu: number;
  melden: number;
  correctief: boolean;
  werkopdracht: boolean;
  fabrikanten_id: number;
  leverancieren_id: number;
  locaties_id: number;
  kostenplaats_id: number;
  parent: number;
  new_id: number;
  old_datum: string;
  treeviewtype: string;
  keuringsinstantie_id: number;
  rie_nr: number;
  onderhoud: number;
  onderhoudstemplate: boolean;
  treeviewsoort_id: number;
  show_visual: boolean;
  gecodeerd: string;
  eigenaar_id: number;
  keuringsplichtig: number;
  laatstgeteld: string;
  onderhoudsbedrijf_id: number;
  stamkaart_old: string;
  objecttemplate_id: number;
  koppelrelatie_id: number;
  nlsfb2_id: number;
  vastgoed_aantal: number;
  vastgoed_eenheden_id: number;
  koppelpersoon_id: number;
  koppelrelatie2_id: number;
  koppelpersoon2_id: number;
  medewerker_id: number;
  omschrijving_id: number;
  opgenomen_in_begroting: number;
  opgenomen_in_begroting_datum: string;
  uitleen_magazijn_id: number;
  uitleen_treeviewsoort_id: number;
  is_uitgeleend: number;
  uitleen_status: number;
  uitleenbaar: number;
  barcode: string;
  aangemaakt_op: string;
  aangemaakt_door: string;
  nonactief_id: number;
  dragernr: string;
  stamkaarten_id: number;
  maat: string;
  deliveryaddress_number: number;
  deliveryaddress_name: string;
  kastnr: number;
  vak: number;
  datum_inbehandeling: string;
  datum_laatste_wasbeurt: string;
  kenteken: string;
  datum_uitleen: string;
  geplande_datum_ontvangst: string;
  datum_laatste_uitscan: string;
  datum_aflevering: string;
  laatste_tellerstand: number;
  laatste_beurt_datum: string;
  tellerstand_opgenomen: boolean;
  geaccepteerd: boolean;
  sweep_api: boolean;
  laatste_beurt: number;
  laatste_servicebeurt_id: number;
  hoofdprocessen_id: number;
  processtappen_id: number;
  machine_monitoringen_timeout_sec: number;
  toegang_type_id: number;
  extern_toegangsbeleid: boolean;
  machine_monitoring_streef_cyclus_tijd: number;
  adres: string;
  postcode: string;
  plaats: string;
}

export interface Tellerstand {
  id: number;
  waarde: number;
  totaal: number;
  datum: number;
  tellerbasis_id: number;
  treeview_id: number;
}

export interface Tellerbasis {
  id: number;
  naam: string;
  omschrijving: string;
  optie: number;
  actief: number;
  afkorting: string;
  max_waarde: number;
}

export interface ProductionData {
  id: number;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  amount: number;
  name: string;
  description: string;
  port: number;
  board: number;
  treeview_id: number;
  treeview2_id: number;
}

export interface MonitoringData {
  id: number;
  board: number;
  port: number;
  com: number;
  code: number;
  code2: number;
  timestamp: string;
  datum: string;
  mac_address: string;
  shot_time: number;
  previous_shot_id: number;
}

export interface MachineMonitoringPoort {
  id: number;
  board: number;
  port: number;
  name: string;
  volgorde: number;
  visible: number;
}
