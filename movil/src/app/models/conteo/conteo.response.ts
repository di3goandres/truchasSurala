import { Reportado } from "../mortalidad/mortalidad.reportado.response";

export interface ReportadoConteoResponse {
    code:       number;
    status:     string;
    Reportados: Reportado[];
}
