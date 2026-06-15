"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MessageCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
      {/* Background Image exactly as in Wix */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/wix/hero_bg.webp"
          alt="Enfermera a domicilio manos"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle overlay to ensure text readability if needed, matching Wix's design */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 flex justify-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#6db5a4]/95 backdrop-blur-sm p-8 md:p-12 max-w-2xl text-white shadow-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enfermera a domicilio en Zaragoza
          </h1>
          
          <div className="space-y-4 text-lg md:text-xl font-light mb-8">
            <p className="font-medium">Atención sanitaria profesional en tu hogar.</p>
            <p>- Sin esperas ni desplazamientos.</p>
            <p>- Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 shadow-md mb-8">
            <p className="text-xl font-bold mb-4 text-[#4a917a]">¿Necesitas ayuda?</p>
            <div className="space-y-3 text-lg">
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4a917a]" /> 
                <span className="font-medium">Teléfono:</span> +34 641 635 705
              </p>
              <p className="flex items-center gap-3 break-all">
                <Mail className="w-5 h-5 text-[#4a917a]" />
                <span className="font-medium">email:</span> info@enfermeraentucasa.es
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="https://wa.me/34641635705" 
              target="_blank"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Whatsapp
            </Link>
            <Link 
              href="mailto:info@enfermeraentucasa.es"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#4a917a] px-8 py-4 font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Enviar email
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
