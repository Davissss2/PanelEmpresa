export type Department = "Desarrollo" | "Administración" | "Ventas" | "Recepción" | "Sistemas";

export interface Computer {
    id: string;
    name: string;
    ip: string;
    mac: string;
    department: Department;
    status: "online" | "offline" | "busy" | "maintenance";
    lastSeen: string;
    currentUser?: string;
    thumbnailUrl?: string; // Placeholder for screenshot
    screenshotUrl?: string; // URL for the live screen capture
}

export interface Camera {
    id: string;
    name: string;
    location: string;
    status: "active" | "inactive" | "error";
    streamUrl?: string; // Placeholder
}

// Generate a random color for the placeholder background to make them look distinct
const getPlaceholder = (text: string) => `https://placehold.co/600x400/1e293b/white?text=${text}`;

export const COMPUTERS: Computer[] = [
    {
        id: "pc-001",
        name: "DES-01",
        ip: "192.168.1.101",
        mac: "00:1B:44:11:3A:B7",
        department: "Desarrollo",
        status: "online",
        lastSeen: "Hace 2 min",
        currentUser: "Juan Pérez",
        screenshotUrl: getPlaceholder("DES-01\\nJuan+Pérez"),
    },
    {
        id: "pc-002",
        name: "DES-02",
        ip: "192.168.1.102",
        mac: "00:1B:44:11:3A:B8",
        department: "Desarrollo",
        status: "busy",
        lastSeen: "Hace 1 min",
        currentUser: "Ana Garcia",
        screenshotUrl: getPlaceholder("DES-02\\nAna+Garcia"),
    },
    {
        id: "pc-003",
        name: "ADM-01",
        ip: "192.168.1.201",
        mac: "00:1B:44:11:3A:C1",
        department: "Administración",
        status: "online",
        lastSeen: "Hace 5 min",
        currentUser: "Carlos Ruiz",
        screenshotUrl: getPlaceholder("ADM-01\\nCarlos+Ruiz"),
    },
    {
        id: "pc-004",
        name: "VNT-01",
        ip: "192.168.1.301",
        mac: "00:1B:44:11:3A:D5",
        department: "Ventas",
        status: "offline",
        lastSeen: "Hace 2 días",
        screenshotUrl: getPlaceholder("VNT-01\\nOffline"),
    },
    {
        id: "pc-005",
        name: "REC-01",
        ip: "192.168.1.10",
        mac: "00:1B:44:11:3A:A1",
        department: "Recepción",
        status: "online",
        lastSeen: "Hace 10 seg",
        currentUser: "Marta Diaz",
        screenshotUrl: getPlaceholder("REC-01\\nMarta+Diaz"),
    },
    {
        id: "pc-006",
        name: "SYS-01",
        ip: "192.168.1.50",
        mac: "00:1B:44:11:3A:F9",
        department: "Sistemas",
        status: "maintenance",
        lastSeen: "Hace 3 horas",
        screenshotUrl: getPlaceholder("SYS-01\\nMantenimiento"),
    },
    {
        id: "pc-007",
        name: "DES-03",
        ip: "192.168.1.103",
        mac: "00:1B:44:11:3A:B9",
        department: "Desarrollo",
        status: "online",
        lastSeen: "Hace 4 min",
        currentUser: "Luis G.",
        screenshotUrl: getPlaceholder("DES-03\\nLuis+G."),
    }
];

export const CAMERAS: Camera[] = [
    { id: "cam-01", name: "Entrada Principal", location: "Planta Baja", status: "active" },
    { id: "cam-02", name: "Pasillo A", location: "Planta 1", status: "active" },
    { id: "cam-03", name: "Sala de Servidores", location: "Sótano", status: "active" },
    { id: "cam-04", name: "Parking", location: "Exterior", status: "error" },
];
