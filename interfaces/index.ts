// Courses
export interface Courses {
  id: number,
  name: string,
  moduls: string[],
  video?: string | null
}
export interface CourseResponse {
  count: number,
  next?: string | null,
  previous?: string | null,
  results: Courses[]
}

export interface GetCoursesParams {
  limit?: number
  offset?: number
  lang: string
}
export interface ModulList {
  id: number;
  name: string;
  themes: string[];
}
export interface CourseTeacher {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;    
  bio: string;
  status: string; 
  student_count: number;
  year: number;             
  projects: number;
  video: string | null;     
}

export interface CourseDetail {
  id: number;
  name: string;
  description: string;
  moduls: ModulList[];
  video?: string | null;
  banner?: string | null;
  teachers?: CourseTeacher[];
}


export interface GetDetailResponse {
  id: number;
  lang: string

}
export interface CourseBannerResponse {
  count: number
  next: string | null
  previous: string | null
  results: CourseBanner[]
}

export interface CourseBanner {
  id: number
  name: string
  description: string
  moduls: BannerModul[]
  video: string
  banner: string
  teachers: BannerTeacher[]
}

export interface BannerModul {
  id: number
  name: string
  themes: string[]
}

export interface BannerTeacher {
  id: number
  first_name: string
  last_name: string
  avatar: string
  bio: string
  status: string
  student_count: number
  year: number
  projects: number
  video: string
}


// Contact
export interface Contact {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

//News
export interface News {
  id: number;
  name: string;
  description: string;
  image: string;
}
export interface NewsResponse {
  count: number,
  next?: string | null,
  previous?: string | null,
  results: News[]
}
export interface GetNewsParams {
  limit?: number
  offset?: number
  lang: string
}
export interface NewsDetail {
  id: number;
  name: string;
  description: string;
  body: string;
  image: string
}

//Projects
export interface Projects {
  id: number;
  name: string;
  url: string;
  photo: string;
}
export interface ProjectsResponse {
  count: number,
  next?: string | null,
  previous?: string | null,
  results: Projects[]
}
export interface GetProjectsParams {
  limit?: number
  offset?: number
  lang: string
}
export interface ProjectDetail{
  id: number;
  name: string;
  description: string;
  url: string;
  photo: string
}

//Teachers
export interface Bio {
  bio_uz: string | null;
  bio_ru: string | null;
  bio_en: string | null;
}

export interface Teacher {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  bio: Bio;
  avatar: string | null;
  video: string | null;
  job: string | null;
  status: string | null;
  year: number | null;
  projects: number;
  student_count: number;
}

export interface TeacherResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Teacher[];
}
export interface GetTeacherParams {
  limit?: number
  offset?: number
  lang: string
}

//students
export interface Students {
  id: number;
  email: string;
  first_name: string;       
  last_name: string;        
  bio: string | null;
  avatar: string | null;    
  video: string | null;     
  job: string | null;
  status: string | null;
  year: number | null;
  projects: number;
}

export interface StudentResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Students[];
}
export interface GetStudentParams {
  limit?: number
  offset?: number
  lang: string
}

