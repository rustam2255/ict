'use client'
import React from 'react'
import HeroSection from './home-components/hero'
import Testimionals from './home-components/testimionals'
import SectionTitle from '../_components/section-title'
import CourseSection from './home-components/courses'
import ProjectsSection from './home-components/projects'
import TeacherSection from './home-components/teacher'
import StudentPage from './home-components/student'
import PartnersSlider from './home-components/partner'
import ContactSection from './home-components/contact'
import NewsSection from './home-components/news'
import { useTranslation } from 'react-i18next'
import AnimatedBackground from '../_components/animate'

const HomePage = () => {
  const {t} = useTranslation()
  return (
    <div className='max-w-[90%]   mx-auto mt-5 '>
      <AnimatedBackground />
      <HeroSection />
      <Testimionals />
      <SectionTitle title={t("hero.news")} />
      <NewsSection />
      <SectionTitle title={t("hero.courses")} />
      <CourseSection />
      <SectionTitle title={t("hero.projects")} />
      <ProjectsSection />
      {/* <SectionTitle title='Recruiting' />
      <RecrutingSection /> */}
      <SectionTitle title={t("hero.teacher")}/>
      <TeacherSection />
      <SectionTitle title={t("hero.students")} />
      <StudentPage/>
      <SectionTitle title={t("hero.partners")} />
      <PartnersSlider />
      <ContactSection />
    </div>
  )
}

export default HomePage