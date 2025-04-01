import { resumeData } from "./data";
const DEFAULT_ID = "resume";
const RESUME_LIST = "resume-list";
const updateDefaultResume = (resume) => {
  localStorage.setItem(DEFAULT_ID, JSON.stringify(resume));
};

const getDefaultResume = () => {
  return getResumeById(DEFAULT_ID);
};

const getResumeList = () => {
  return JSON.parse(localStorage.getItem(RESUME_LIST)) || [];
};

const getResumeById = (resumeId) => {
  return JSON.parse(localStorage.getItem(resumeId)) || resumeData;
};

const saveResumeList = (resumeList) => {
  localStorage.setItem(RESUME_LIST, JSON.stringify(resumeList));
};

const removeResume = (resumeId) => {
  localStorage.removeItem(resumeId);
};

const saveResume = (resumeId, resume) => {
  localStorage.setItem(resumeId, JSON.stringify(resume));
};

const dataStore = {
  updateDefaultResume: updateDefaultResume,
  getDefaultResume: getDefaultResume,
  getResumeList: getResumeList,
  getResumeById: getResumeById,
  saveResumeList: saveResumeList,
  removeResume: removeResume,
  saveResume: saveResume,
  defaultResumeId: DEFAULT_ID,
};

export default dataStore;
