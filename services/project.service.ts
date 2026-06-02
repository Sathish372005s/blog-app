import Client from "@/models/client";
import Project from "@/models/project";
import { error } from "console";
import { json } from "zod";

export async function createprojectservice(data: any, userId: string) {
  const client = await Client.findOne({ user: userId });
  if (!client) {
    throw new Error("user not existe exists");
  }
  const project = await Project.create({
    client: client._id,
    ...data,
  });
  return project;
}

export async function getmyprojectservice(userId: string) {
  const client = await Client.findOne({ user: userId });
  if (!client) {
    throw new Error("user not existe exists");
  }
  const project = await Project.find({ client: client._id });
  if (!project) {
    throw new Error("no project posted");
  }
  return project;
}

export async function updateProjectService(
  data: any,
  userId: string,
  projectId: string,
) {
  const client = await Client.findOne({
    user: userId,
  });

  if (!client) {
    throw new Error("Client profile not found");
  }

  const project = await Project.findOne({
    _id: projectId,
    client: client._id,
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  const updatedProject = await Project.findByIdAndUpdate(projectId, data, {
    new: true,
  });

  return updatedProject;
}

export async function getoneprojectservice(projectId: string) {
  const singleproject = await Project.findById({ projectId }).populate(
    "client",
  );
  if (!singleproject) {
    throw new Error("project not found");
  }
  return singleproject;
}



export async function deleteprojectservice(projectId: string) {
  const existingproject = await Project.findOne({ user: projectId });
  if (!existingproject) {
    throw new Error("profile register yet");
  }
  await Project.findByIdAndDelete(projectId);
  return json({ message: "deleted successfully" });
}
