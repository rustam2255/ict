"use client"

import { Projects } from "@/interfaces"
import { useGetProjectsQuery } from "@/service/api"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

const ProjectsSection = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const { data, isLoading } = useGetProjectsQuery({ limit: 10, offset: 0, lang })
  const projects: Projects[] = data?.results || []

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      {/* 📱 Mobile - faqat 4 dona */}
      <div className="block sm:hidden space-y-4 mt-5">
        {projects.slice(0, 4).map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link href={project.url} className="contents" target="_blank">
              <div className="relative w-full h-48">
                <Image
                  src={project.photo}
                  alt={project.name}
                  fill
                  className="object-cover rounded-[12px] cursor-pointer"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 💻 Tablet - 2 ustun grid */}
      <div className="hidden sm:block lg:hidden mt-5">
        <div className="grid grid-cols-2 gap-4">
          {projects.slice(0, 4).map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link href={project.url} className="contents" target="_blank">
                <div className="relative w-full h-60">
                  <Image
                    src={project.photo}
                    alt={project.name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🖥️ Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 grid-rows-2 gap-x-12 gap-y-6 mt-5">
          {/* Katta project */}
          {projects[0] && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-6 row-span-2"
            >
              <Link href={projects[0].url} className="contents" target="_blank">
                <div className="relative w-full h-[425px]">
                  <Image
                    src={projects[0].photo}
                    alt={projects[0].name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Qolganlari */}
          {projects.slice(1, 5).map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-3 row-span-1"
            >
              <Link href={project.url} className="contents" target="_blank">
                <div className="relative w-full h-[203px]">
                  <Image
                    src={project.photo}
                    alt={project.name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-5">
          {projects[5] && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-3 row-span-1"
            >
              <Link href={projects[5].url} className="contents" target="_blank">
                <div className="relative w-full h-[203px]">
                  <Image
                    src={projects[5].photo}
                    alt={projects[5].name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          )}
          {projects[6] && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-9 row-span-2"
            >
              <Link href={projects[6].url} className="contents" target="_blank">
                <div className="relative w-full h-[425px]">
                  <Image
                    src={projects[6].photo}
                    alt={projects[6].name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          )}
          {projects[7] && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-3 row-span-1"
            >
              <Link href={projects[7].url} className="contents" target="_blank">
                <div className="relative w-full h-[203px]">
                  <Image
                    src={projects[7].photo || "/images/student.jpg"}
                    alt={projects[7].name}
                    fill
                    className="object-cover rounded-[12px] cursor-pointer"
                  />
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
