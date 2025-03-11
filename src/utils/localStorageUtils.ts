
import { Course, CourseCategory } from "@/services/courseService";

// Keys for localStorage
const COURSES_STORAGE_KEY = "mrc_courses";
const CATEGORIES_STORAGE_KEY = "mrc_categories";

// Initialize localStorage with default data
export const initializeLocalStorage = (
  defaultCourses: Course[],
  defaultCategories: CourseCategory[]
): void => {
  // Check if courses already exist in localStorage
  if (!localStorage.getItem(COURSES_STORAGE_KEY)) {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(defaultCourses));
  }
  
  // Check if categories already exist in localStorage
  if (!localStorage.getItem(CATEGORIES_STORAGE_KEY)) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(defaultCategories));
  }
};

// Get all courses from localStorage
export const getCoursesFromStorage = (): Course[] => {
  const coursesData = localStorage.getItem(COURSES_STORAGE_KEY);
  if (!coursesData) return [];
  
  try {
    const courses = JSON.parse(coursesData);
    // Ensure dates are Date objects
    return courses.map((course: any) => ({
      ...course,
      dateCreated: new Date(course.dateCreated),
      lastUpdated: new Date(course.lastUpdated)
    }));
  } catch (error) {
    console.error("Error parsing courses from localStorage:", error);
    return [];
  }
};

// Get all categories from localStorage
export const getCategoriesFromStorage = (): CourseCategory[] => {
  const categoriesData = localStorage.getItem(CATEGORIES_STORAGE_KEY);
  if (!categoriesData) return [];
  
  try {
    return JSON.parse(categoriesData);
  } catch (error) {
    console.error("Error parsing categories from localStorage:", error);
    return [];
  }
};

// Save a course to localStorage
export const saveCourseToStorage = (course: Course): void => {
  const courses = getCoursesFromStorage();
  
  // Check if course already exists
  const existingIndex = courses.findIndex(c => c.id === course.id);
  
  if (existingIndex >= 0) {
    // Update existing course
    courses[existingIndex] = {
      ...course,
      lastUpdated: new Date()
    };
  } else {
    // Add new course
    courses.push(course);
  }
  
  // Save to localStorage
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  
  // Update category count
  updateCategoryCount(course.category);
};

// Delete a course from localStorage
export const deleteCourseFromStorage = (courseId: string): void => {
  const courses = getCoursesFromStorage();
  const courseToDelete = courses.find(c => c.id === courseId);
  
  if (!courseToDelete) return;
  
  // Remove course
  const updatedCourses = courses.filter(c => c.id !== courseId);
  
  // Save to localStorage
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(updatedCourses));
  
  // Update category count
  updateCategoryCount(courseToDelete.category, -1);
};

// Update the count for a category
const updateCategoryCount = (categoryId: string, increment: number = 1): void => {
  const categories = getCategoriesFromStorage();
  
  // Find category
  const categoryIndex = categories.findIndex(c => c.id === categoryId);
  
  if (categoryIndex >= 0) {
    // Update count
    categories[categoryIndex].count += increment;
    
    // Save to localStorage
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }
};
