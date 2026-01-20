import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  const projects = await storage.getProjects();
  if (projects.length === 0) {
    console.log("Seeding database...");
    await storage.createProject({
      title: "CSEL Cincy",
      description: "Center for Social-Emotional Learning website. Features resource management, event calendars, and donation processing for a non-profit organization.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      link: "https://cselcincy.org",
      isFeatured: true
    });
    
    await storage.createProject({
      title: "E-Commerce Solution",
      description: "Modern e-commerce platform with inventory management, Stripe integration, and real-time analytics.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
      link: "#",
      isFeatured: false
    });

    await storage.createProject({
      title: "Corporate Dashboard",
      description: "Internal business intelligence dashboard visualizing key performance indicators and team metrics.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "#",
      isFeatured: false
    });
  }

  return httpServer;
}
