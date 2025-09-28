'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, CourseBannerResponse, CourseDetail, CourseResponse, GetCoursesParams, GetDetailResponse, GetNewsParams, GetProjectsParams, GetStudentParams, GetTeacherParams, NewsDetail, NewsResponse, ProjectDetail, ProjectsResponse, StudentResponse, Students, TeacherResponse } from '@/interfaces/index'

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponse, GetCoursesParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/courses/api/v1/?${params.toString()}`
      },
    }),
    getCoursesBanner: builder.query<CourseBannerResponse, GetCoursesParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/courses/api/v1/banners/?${params.toString()}`
      },
    }),
    getCourseDetail: builder.query<CourseDetail, GetDetailResponse>({
      query: ({ id, lang }) => `/${lang}/courses/api/v1/detail/${id}`,
    }),
    getProjects: builder.query<ProjectsResponse, GetProjectsParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/courses/api/v1/projects/?${params.toString()}`
      }
    }),
    getProjectDetail: builder.query<ProjectDetail, GetDetailResponse>({
      query: ({ id, lang }) => `/${lang}/courses/api/v1/project/${id}`
    }),
    getNews: builder.query<NewsResponse, GetNewsParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/courses/api/v1/news/`
      }
    }),
    getNewsDetail: builder.query<NewsDetail, GetDetailResponse>({
      query: ({ id, lang }) => `/${lang}/courses/api/v1/news/${id}`
    }),
    getTeacher: builder.query<TeacherResponse, GetTeacherParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/accounts/api/v1/our-teachers/`
      }
    }),
    getStudent: builder.query<StudentResponse, GetStudentParams>({
      query: ({ limit = 10, offset = 0, lang }) => {
        const params = new URLSearchParams()
        params.append("limit", limit.toString())
        params.append("offset", offset.toString())
        return `/${lang}/accounts/api/v1/our-students/`
      }
    }),
    getStudentDetail: builder.query<Students, GetDetailResponse>({
      query: ({ id, lang }) => `/${lang}/accounts/api/v1/our-student/${id}`
    }),
    postContact: builder.mutation<Contact, Partial<Contact>>({
      query: (body) => ({
        url: "/ru/base/api/v1/contact/",
        method: "POST",
        body,
      }),
    }),

  }),
})


export const {
  useGetCoursesBannerQuery,
  useGetCoursesQuery,
  useGetCourseDetailQuery,
  useGetProjectsQuery,
  useGetProjectDetailQuery,
  useGetNewsQuery,
  useGetNewsDetailQuery,
  useGetTeacherQuery,
  useGetStudentQuery,
  useGetStudentDetailQuery,
  usePostContactMutation
} = API