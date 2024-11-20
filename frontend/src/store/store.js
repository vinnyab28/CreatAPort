import { configureStore } from '@reduxjs/toolkit';
import profileReducer from "../store/ProfileSlice";
import educationReducer from './EducationSlice';
import experienceReducer from './ExperienceSlice';
import projectReducer from "./ProjectsSlice";
import skillsReducer from './SkillsSlice';

export default configureStore({
    reducer: {
        profile: profileReducer,
        skills: skillsReducer,
        education: educationReducer,
        experience: experienceReducer,
        projects: projectReducer
    }
})