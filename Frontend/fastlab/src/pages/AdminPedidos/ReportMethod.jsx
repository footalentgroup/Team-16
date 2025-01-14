import React, { useState } from "react";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ReportMethod = () => {
  const [selected, setSelected] = useState(null); // Estado para manejar el botón seleccionado

  const options = [
    { id: 1, label: "Retiro en laboratorio" },
    { id: 2, label: "Entrega a domicilio" },
    { id: 3, label: "Enviar por correo" },
  ];

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      {/* Contenido principal */}
      <div className="ml-[266px] h-full p-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/pedidos" },
            { title: "Ingresar orden", to: "/admin/ingresar-orden" },
          ]}
        />

        <h1 className="text-2xl text-center font-bold mb-8">Método de entrega</h1>

        {/* Barra de progreso */}
        <Progress className="[&>*]:bg-[#02807D] mb-6" value={100}  />

        {/* Botones */}
        <div className="flex justify-center space-x-4 mb-8">
          {options.map((option) => (
            <Button
              key={option.id}
              variant={selected === option.id ? "default" : "outline"}
              size="default"
              className={`flex items-center ${selected === option.id
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

        {/* Botón de emitir orden */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#02807D] text-white border-[#02807D] hover:bg-[#02807D]/10"
          >
            Emitir orden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportMethod;
