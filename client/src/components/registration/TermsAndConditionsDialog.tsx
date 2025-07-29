
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditionsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-green-600 p-0 h-auto underline text-sm font-bold">
          Ver más Términos y Condiciones de Uso
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#222408] border-[#cad95e]/30 text-[#FCF8EE] max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#cad95e] text-xl font-gasoek">
            Términos y Condiciones de Uso
          </DialogTitle>
          <DialogDescription className="text-[#FCF8EE]/70 text-sm">
            Festival NATUR – Festival Nacional de Turismo Sostenible y Responsable
            <br />
            Última actualización: 09-05-2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <p>
              Bienvenido al sitio web oficial del Festival NATUR, un evento organizado por LA EMPRESA Tripcol. Al acceder o utilizar nuestro sitio web, 
              usted acepta cumplir los siguientes Términos y Condiciones. Si no está de acuerdo con estos términos, le recomendamos no utilizar este sitio.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#cad95e]">1. Uso del sitio web</h3>
              <p>
                Este sitio tiene como finalidad brindar información sobre el Festival NATUR, sus actividades, convocatorias, programación y aliados. 
                Cualquier uso indebido, reproducción no autorizada de los contenidos, o uso con fines comerciales sin previa autorización escrita, está prohibido.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#cad95e]">2. Tratamiento de datos personales</h3>
              <p>
                En cumplimiento de la Ley 1581 de 2012 y sus normas reglamentarias, informamos que los datos personales recolectados a través de formularios
                en este sitio web serán tratados conforme a las siguientes condiciones:
              </p>
              <div className="pl-4 space-y-3 mt-2">
                <div>
                  <h4 className="font-medium text-[#cad95e]/80">a. Finalidad del tratamiento</h4>
                  <p>Los datos recolectados serán utilizados exclusivamente para:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Gestionar la inscripción de participantes, artistas, aliados, proveedores y público general.</li>
                    <li>Enviar información relevante sobre el Festival y futuras ediciones.</li>
                    <li>Atender solicitudes, sugerencias o quejas.</li>
                    <li>Cumplir obligaciones legales.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#cad95e]/80">b. Responsable del tratamiento</h4>
                  <p>Jorge Andrés Rodríguez</p>
                  <p>Correo electrónico: festivalnatur@festivalnatur.org</p>
                  <p>Dirección: Calle 11 n 3 -25</p>
                  <p>Teléfono: 3108758064</p>
                </div>

                <div>
                  <h4 className="font-medium text-[#cad95e]/80">c. Derechos del titular de los datos</h4>
                  <p>De acuerdo con la legislación colombiana, usted tiene derecho a:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Conocer, actualizar y rectificar sus datos personales.</li>
                    <li>Solicitar prueba de la autorización otorgada.</li>
                    <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
                    <li>Revocar la autorización y/o solicitar la supresión del dato.</li>
                    <li>Acceder de forma gratuita a sus datos personales.</li>
                  </ul>
                  <p className="mt-1">
                    Para ejercer estos derechos puede comunicarse al correo electrónico indicado o seguir el procedimiento establecido 
                    en nuestra Política de Tratamiento de Datos Personales.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-[#cad95e]/80">d. Autorización</h4>
                  <p>
                    Al diligenciar formularios en este sitio web, usted manifiesta haber sido informado sobre el tratamiento de sus datos personales 
                    y autoriza de manera libre, expresa y voluntaria el uso de los mismos conforme a las finalidades descritas.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#cad95e]">3. Propiedad intelectual</h3>
              <p>
                Todos los contenidos del sitio web (textos, imágenes, logos, videos, marcas) son propiedad del Festival NATUR o de sus respectivos autores 
                y están protegidos por las normas nacionales e internacionales de derechos de autor. Está prohibida su reproducción total o parcial sin autorización previa.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#cad95e]">4. Modificaciones</h3>
              <p>
                El Festival se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. 
                Las modificaciones entrarán en vigencia desde su publicación en el sitio web.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[#cad95e]">5. Legislación aplicable y jurisdicción</h3>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. 
                Cualquier controversia se resolverá ante la jurisdicción ordinaria colombiana, en la ciudad de Bogotá D.C.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
