---
title: "Architecting a High-Performance In-House PACS & RIS Platform"
slug: "in-house-pacs-ris-platform"
description: "How I engineered a proprietary radiology ecosystem using Next.js and Kubernetes, eliminating vendor lock-in and achieving a 70% reduction in licensing costs for one of Indonesia's leading healthcare providers."
tags: ["System Architecture", "Kubernetes", "Azure", "HL7 FHIR", "DICOM", "Next.js"]
category: "Healthcare Engineering"
stack: ["Next.js", "Kubernetes", "Azure", "DICOM", "HL7 FHIR", "GitHub Actions"]
featured: true
date: "2023-11-01"
duration: "Ongoing"
role: "System Architect & Software Engineer"
readTime: 8
-----------

## Executive Summary

I led the end-to-end design and implementation of a proprietary **PACS (Picture Archiving and Communication System)** and **RIS (Radiology Information System)**. This strategic initiative was designed to dismantle reliance on expensive foreign vendor solutions and build a specialized, high-velocity healthcare ecosystem.

By leveraging **Next.js (SSR)**, **Go**, and **Kubernetes**, we built a platform that not only matched commercial features but exceeded them in integration flexibility. The project was awarded the **Kalbe Innovation Convention 2024** for its significant contribution to digital transformation and cost optimization.

---

## Strategic Impact

The platform transformed radiology operations from a cost-center into a streamlined, internally-owned asset.

*   **Financial Excellence**: Achieved a **60% reduction in licensing and operational costs** by migrating from legacy foreign vendors to an in-house stack.
*   **Operational Velocity**: Reduced the time-to-integration for new hospital deployments by standardizing the interoperability layer.
*   **Regulatory Leadership**: Fully compliant with Indonesian healthcare regulations (**TKDN, CPAKB, and AKD certification**), facilitating smooth local adoption.
*   **Engineering Ownership**: Eliminated "Black Box" vendor dependencies, allowing for rapid feature deployment and custom clinical workflows.
*   **Award-Winning Innovation**: Recognized as the top internal innovation at the **Kalbe Innovation Convention 2024**.

---

## System Architecture

The architecture was designed as a **cloud-native, edge-ready** platform. While development and CI/CD occur in **Azure**, the production environment is optimized for **on-premise Kubernetes clusters** to meet strict data residency requirements.

It utilizes our core interoperability engine as its backbone:
[**Universal Healthcare Integration Middleware**](/case-studies/universal-healthcare-integration-middleware)

```mermaid
flowchart TD
    subgraph "Clinical Sources"
        Modality[Imaging Modalities<br/>CT, MRI, X-Ray]
    end

    subgraph "Radiology Core (On-Prem)"
        DICOM_Gate[DICOM Interface]
        PACS_Engine[MIMPS / PACS Storage]
        RIS_Engine[RIS Management]
        WebApp[Next.js SSR Frontend]
    end

    subgraph "Integration Layer"
        Middleware[Integration Middleware]
        HIS[Hospital Information Systems]
    end

    Modality -->|DICOM C-STORE| DICOM_Gate
    DICOM_Gate --> PACS_Engine
    WebApp -->|Diagnostic Viewing| PACS_Engine
    WebApp -->|Workflow UI| RIS_Engine
    RIS_Engine <-->|Study Metadata| PACS_Engine
    RIS_Engine <-->|HL7 FHIR| Middleware
    Middleware <--> HIS
```

### Core Engineering Pillars

1.  **PACS (MIMPS) Engine**: A robust DICOM-compliant storage and retrieval system that handles massive imaging studies with high availability.
2.  **RIS (Workflow Management)**: Orchestrates patient scheduling, exam tracking, and radiologist reporting.
3.  **Modern Frontend (Next.js SSR)**: A high-performance web interface designed for radiologists. Using SSR ensures that **Sensitive Patient Data (PHI)** is processed on the server, minimizing the browser footprint and enhancing security.
4.  **Hybrid Infrastructure**: Orchestrated with **GitHub Actions**, moving from **Azure** development environments to **On-Premise Kubernetes** production environments.

---

## The Challenge: Breaking the "Black Box"

The primary challenge was the **High Barrier to Entry** in healthcare tech. Legacy vendors often provide "Black Box" systems that are:
*   Slow to integrate with local EMRs.
*   Prohibitively expensive to scale.
*   Difficult to customize for local regulatory needs (SATUSEHAT integration, local reporting formats).

---

## Technical Solutions & Decisions

### 1. Hybrid Interoperability
**Decision**: Instead of building point-to-point links, I implemented a **Middleware-First approach**.
**Result**: The RIS/PACS can now "talk" to almost any Hospital Information System (HIS) using a standardized FHIR/HL7 bridge, making deployments modular and predictable.

### 2. Security via Server-Side Rendering
**Decision**: Chose **Next.js SSR** specifically for clinical compliance.
**Result**: By performing data fetching on the server, we eliminated direct API exposure from the client-side. This architecture ensures that even in complex hospital networks, the attack surface for PHI (Protected Health Information) is kept to a minimum.

### 3. Kubernetes at the Edge
**Decision**: Automated resource management using **Kubernetes** for on-premise hospital servers.
**Result**: This allows us to provide "Cloud-like" reliability—including self-healing and easy updates—even when the system is running on a physical server inside a hospital's basement.

---

## Final Results

The project marked a turning point in the company's digital strategy. We successfully delivered:
*   **70% Cost Efficiency**: Saved significantly on foreign currency outflows.
*   **Zero-Vendor Dependency**: We own every line of code, from the DICOM handler to the UI.
*   **Scalability**: The system is active in production, serving thousands of studies with high uptime.

> **Winner: Kalbe Innovation Convention 2024**  
> "A technical masterpiece that proves internal engineering can outperform global vendors while delivering massive business value."

---

## Technology Stack

*   **Frontend**: Next.js, Tailwind CSS, Svelte (Internal Tools)
*   **Backend**: Go, Node.js, Integration Middleware
*   **Interoperability**: HL7 v2, FHIR, DICOM
*   **Infrastructure**: Kubernetes, Azure, Docker
*   **DevOps**: GitHub Actions, ArgoCD
*   **Regulatory**: TKDN, CPAKB, AKD Certified
