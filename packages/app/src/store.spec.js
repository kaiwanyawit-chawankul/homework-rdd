import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import dataStore from "./store";
import { resumeData } from "./data";

describe("dataStore", () => {
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should update the default resume", () => {
    const newResume = { name: "New Resume" };
    dataStore.updateDefaultResume(newResume);
    expect(JSON.parse(localStorage.getItem(dataStore.defaultResumeId))).toEqual(
      newResume,
    );
  });

  it("should get the default resume", () => {
    const defaultResume = { name: "Default Resume" };
    localStorage.setItem(
      dataStore.defaultResumeId,
      JSON.stringify(defaultResume),
    );
    expect(dataStore.getDefaultResume()).toEqual(defaultResume);
  });

  it("should return resumeData if no default resume is found", () => {
    expect(dataStore.getDefaultResume()).toEqual(resumeData);
  });

  it("should get the resume list", () => {
    const resumeList = ["resume1", "resume2"];
    dataStore.saveResumeList(resumeList);
    expect(dataStore.getResumeList()).toEqual(resumeList);
  });

  it("should return an empty array if no resume list is found", () => {
    expect(dataStore.getResumeList()).toEqual([]);
  });

  it("should get a resume by id", () => {
    const resume = { name: "Resume 1" };
    const resumeId = "resume1";
    localStorage.setItem(resumeId, JSON.stringify(resume));
    expect(dataStore.getResumeById(resumeId)).toEqual(resume);
  });

  it("should return resumeData if no resume is found by id", () => {
    expect(dataStore.getResumeById("nonexistent")).toEqual(resumeData);
  });

  it("should save the resume list", () => {
    const resumeList = ["resume1", "resume2"];
    dataStore.saveResumeList(resumeList);
    expect(JSON.parse(localStorage.getItem("resume-list"))).toEqual(resumeList);
  });

  it("should remove a resume", () => {
    const resumeId = "resume1";
    localStorage.setItem(resumeId, JSON.stringify({ name: "Resume 1" }));
    dataStore.removeResume(resumeId);
    expect(localStorage.getItem(resumeId)).toBeNull();
  });

  it("should save a resume", () => {
    const resumeId = "resume1";
    const resume = { name: "Resume 1" };
    dataStore.saveResume(resumeId, resume);
    expect(JSON.parse(localStorage.getItem(resumeId))).toEqual(resume);
  });
});
