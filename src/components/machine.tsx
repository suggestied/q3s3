"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Machine } from "@/types";
import {
  Activity,
  CogIcon,
  Calendar,
  Zap,
  FileText,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MachineComponentProps {
  machine: Machine;
}

export function MachineComponent({ machine }: MachineComponentProps) {
  const [activeTab, setActiveTab] = useState("general");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear() > 1
      ? date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
  };

  const formatCurrency = (value: number) => {
    return value
      ? new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(value)
      : "N/A";
  };

  const renderField = (
    label: string,
    value: string | number | boolean | null | undefined
  ) => {
    if (value === null || value === undefined || value === "" || value === 0)
      return null;
    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="text-gray-800">
          {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
        </span>
      </div>
    );
  };

  const calculateHealth = () => {
    let health = 100;
    if (machine.keuringsplichtig) health -= 20;
    if (!machine.actief) health -= 30;
    if (machine.laatste_tellerstand > 10000) health -= 10;
    return Math.max(health, 0);
  };

  const health = calculateHealth();

  const getHealthColor = (health: number) => {
    if (health > 70) return "text-green-600";
    if (health > 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg bg-white border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            {machine.naam}
          </CardTitle>
          <Badge variant={machine.actief ? "default" : "secondary"}>
            {machine.actief ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{machine.omschrijving}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Activity className={`w-5 h-5 ${getHealthColor(health)}`} />
          <span className="font-medium text-gray-700">Machine Health:</span>
          <Progress value={health} className="w-1/2" />
          <span className={`text-sm font-medium ${getHealthColor(health)}`}>
            {health}%
          </span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full mb-4 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
            >
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] p-0 bg-white text-gray-800 border-2 border-gray-200">
            <DialogHeader className="p-6 bg-gray-50 border-b border-gray-200">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {machine.naam} Details
              </DialogTitle>
            </DialogHeader>
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 gap-1 px-2">
                {[
                  "general",
                  "maintenance",
                  "financial",
                  "location",
                  "additional",
                ].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className=" text-gray-600 hover:text-gray-800 data-[state=active]:bg-white data-[state=active]:text-gray-800 rounded"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollArea className="h-[60vh] p-6 bg-white">
                {[
                  "general",
                  "maintenance",
                  "financial",
                  "location",
                  "additional",
                ].map((tab) => (
                  <TabsContent
                    key={tab}
                    value={tab}
                    className="space-y-4 focus:outline-none"
                  >
                    {tab === "general" && (
                      <>
                        {renderField("ID", machine.id)}
                        {renderField("Serial Number", machine.serienummer)}
                        {renderField("Build Year", machine.bouwjaar)}
                        {renderField("Object Type", machine.object)}
                        {renderField("Barcode", machine.barcode)}
                        {renderField(
                          "Created On",
                          formatDate(machine.aangemaakt_op)
                        )}
                        {renderField("Created By", machine.aangemaakt_door)}
                      </>
                    )}
                    {tab === "maintenance" && (
                      <>
                        {renderField("Maintenance Required", machine.onderhoud)}
                        {renderField(
                          "Maintenance Template",
                          machine.onderhoudstemplate
                        )}
                        {renderField(
                          "Last Counted",
                          formatDate(machine.laatstgeteld)
                        )}
                        {renderField(
                          "Last Wash Date",
                          formatDate(machine.datum_laatste_wasbeurt)
                        )}
                        {renderField(
                          "Last Service Date",
                          formatDate(machine.laatste_beurt_datum)
                        )}
                        {renderField(
                          "Last Counter Reading",
                          machine.laatste_tellerstand
                        )}
                        {renderField(
                          "Counter Reading Taken",
                          machine.tellerstand_opgenomen
                        )}
                        {renderField(
                          "Inspection Required",
                          machine.keuringsplichtig
                        )}
                      </>
                    )}
                    {tab === "financial" && (
                      <>
                        {renderField(
                          "Purchase Value",
                          formatCurrency(machine.aanschafwaarde)
                        )}
                        {renderField(
                          "Depreciation",
                          formatCurrency(machine.afschrijving)
                        )}
                        {renderField(
                          "Annual Depreciation",
                          formatCurrency(machine.jaarafschrijving)
                        )}
                        {renderField(
                          "Previous Budget",
                          formatCurrency(machine.budgetvorig)
                        )}
                        {renderField(
                          "Current Budget",
                          formatCurrency(machine.budgetnu)
                        )}
                        {renderField(
                          "Depreciation Year",
                          machine.afschrijvingeen
                        )}
                      </>
                    )}
                    {tab === "location" && (
                      <>
                        {renderField("Location ID", machine.locaties_id)}
                        {renderField("Address", machine.adres)}
                        {renderField("Postal Code", machine.postcode)}
                        {renderField("City", machine.plaats)}
                        {renderField("Cabinet Number", machine.kastnr)}
                        {renderField("Compartment", machine.vak)}
                      </>
                    )}
                    {tab === "additional" && (
                      <>
                        {renderField(
                          "Tree View Type ID",
                          machine.treeviewtype_id
                        )}
                        {renderField("Tree View Type", machine.treeviewtype)}
                        {renderField(
                          "Tree View Sort ID",
                          machine.treeviewsoort_id
                        )}
                        {renderField("Show Visual", machine.show_visual)}
                        {renderField("Encoded", machine.gecodeerd)}
                        {renderField("Owner ID", machine.eigenaar_id)}
                        {renderField(
                          "Maintenance Company ID",
                          machine.onderhoudsbedrijf_id
                        )}
                        {renderField(
                          "Object Template ID",
                          machine.objecttemplate_id
                        )}
                        {renderField(
                          "Relation Link ID",
                          machine.koppelrelatie_id
                        )}
                        {renderField("NLSFB2 ID", machine.nlsfb2_id)}
                        {renderField(
                          "Real Estate Amount",
                          machine.vastgoed_aantal
                        )}
                        {renderField(
                          "Real Estate Units ID",
                          machine.vastgoed_eenheden_id
                        )}
                        {renderField(
                          "Person Link ID",
                          machine.koppelpersoon_id
                        )}
                        {renderField(
                          "Relation Link 2 ID",
                          machine.koppelrelatie2_id
                        )}
                        {renderField(
                          "Person Link 2 ID",
                          machine.koppelpersoon2_id
                        )}
                        {renderField("Employee ID", machine.medewerker_id)}
                        {renderField("Description ID", machine.omschrijving_id)}
                        {renderField(
                          "Included in Budget",
                          machine.opgenomen_in_begroting
                        )}
                        {renderField(
                          "Included in Budget Date",
                          formatDate(machine.opgenomen_in_begroting_datum)
                        )}
                        {renderField(
                          "Loan Warehouse ID",
                          machine.uitleen_magazijn_id
                        )}
                        {renderField(
                          "Loan Tree View Sort ID",
                          machine.uitleen_treeviewsoort_id
                        )}
                        {renderField("Is Loaned Out", machine.is_uitgeleend)}
                        {renderField("Loan Status", machine.uitleen_status)}
                        {renderField("Loanable", machine.uitleenbaar)}
                        {renderField("Non-active ID", machine.nonactief_id)}
                        {renderField("Carrier Number", machine.dragernr)}
                        {renderField("Data Sheets ID", machine.stamkaarten_id)}
                        {renderField("Size", machine.maat)}
                        {renderField(
                          "Delivery Address Number",
                          machine.deliveryaddress_number
                        )}
                        {renderField(
                          "Delivery Address Name",
                          machine.deliveryaddress_name
                        )}
                        {renderField("License Plate", machine.kenteken)}
                        {renderField(
                          "Loan Date",
                          formatDate(machine.datum_uitleen)
                        )}
                        {renderField(
                          "Planned Receipt Date",
                          formatDate(machine.geplande_datum_ontvangst)
                        )}
                        {renderField(
                          "Last Scan Out Date",
                          formatDate(machine.datum_laatste_uitscan)
                        )}
                        {renderField(
                          "Delivery Date",
                          formatDate(machine.datum_aflevering)
                        )}
                        {renderField("Accepted", machine.geaccepteerd)}
                        {renderField("Sweep API", machine.sweep_api)}
                        {renderField("Last Service", machine.laatste_beurt)}
                        {renderField(
                          "Last Service ID",
                          machine.laatste_servicebeurt_id
                        )}
                        {renderField(
                          "Main Processes ID",
                          machine.hoofdprocessen_id
                        )}
                        {renderField(
                          "Process Steps ID",
                          machine.processtappen_id
                        )}
                        {renderField(
                          "Machine Monitoring Timeout (sec)",
                          machine.machine_monitoringen_timeout_sec
                        )}
                        {renderField("Access Type ID", machine.toegang_type_id)}
                        {renderField(
                          "External Access Policy",
                          machine.extern_toegangsbeleid
                        )}
                        {renderField(
                          "Machine Monitoring Target Cycle Time",
                          machine.machine_monitoring_streef_cyclus_tijd
                        )}
                      </>
                    )}
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-2 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                >
                  <CogIcon className="w-4 h-4 mr-2" />
                  Maintenance
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Schedule maintenance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View machine schedule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Usage
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View usage statistics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate reports</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* {machine.keuringsplichtig > 0 && (
          <div className="mt-4 flex items-center text-yellow-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Inspection Required</span>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
