import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import { Button } from "@/components/ui/button";
import { Check, Terminal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast, ToastContainer } from "react-toastify";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ReportMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const previousData = location.state || {};

  const [selected, setSelected] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const options = [
    { id: 1, label: "Retiro en laboratorio" },
    { id: 2, label: "Entrega a domicilio" },
    { id: 3, label: "Enviar por correo" },
  ];

  const handleEmitOrder = async () => {
    if (!selected) {
        toast.error(`Debes seleccionar un método de entrega`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
      return;
    }

    const isoDate = previousData.fechaReceta
      ? new Date(previousData.fechaReceta).toISOString()
      : new Date().toISOString();

    const payload = {
      status: previousData.prioridad || "PENDING",
      dateExam: isoDate,
      priority: previousData.prioridad || "",
      observations: previousData.observaciones || "",
      patientId: previousData.patientId || 0,
      doctorId: previousData.doctorId || 0,
      examIds: previousData.examIds || [],
    };

    try {
      const response = await fetch(`${BACKEND_URL}/results/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error al emitir la orden. Código: ${response.status}`);
      }

      const data = await response.json();

      setShowAlert(true);

      setTimeout(() => {
        navigate("/admin/ingresar-orden", { state: data });
      }, 2000);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="relative max-h-screen h-screen bg-white">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
      <ToastContainer />
      <div className="ml-[266px] overflow-y-auto h-full">
        <main className="flex-1 p-8">
          <div className="mx-auto">
            <Breadcrumb
              items={[
                { title: "Admin", to: "/admin/pedidos" },
                { title: "Ingresar orden", to: "/admin/ingresar-orden" },
                {
                  title: "Orden de analisis",
                  to: "/admin/ingresar-orden/paciente-registrado/orden-de-analisis",
                },
                { title: "Método de envio" },
              ]}
            />

            <h1 className="text-2xl text-center font-bold mb-8">
              Método de entrega
            </h1>
            <Progress className="[&>*]:bg-[#02807D] mb-6" value={100} />

            <div className="flex justify-center space-x-4 mb-8">
              {options.map((option) => (
                <Button
                  key={option.id}
                  variant={selected === option.id ? "default" : "outline"}
                  size="default"
                  className={`flex items-center ${
                    selected === option.id
                      ? "bg-white text-[#02807D] border-[#02807D] hover:bg-[#02807D]/10"
                      : "hover:bg-gray-500 hover:text-primary-foreground"
                  }`}
                  onClick={() => setSelected(option.id)}
                >
                  {selected === option.id && <Check className="mr-2 h-4 w-4" />}
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#02807D] text-white border-[#02807D] hover:bg-[#02807D]/10"
                onClick={handleEmitOrder}
              >
                Emitir orden
              </Button>
            </div>

            {showAlert && (
              <Alert className="opacity-100">
                <Terminal className="h-4 w-4 text-white" />
                <div>
                  <AlertTitle>Emisión completa</AlertTitle>
                  <AlertDescription>Tu orden se guardo.</AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportMethod;
