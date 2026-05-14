import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Project } from '../data/projects';

interface ProjectMapProps {
  projects: Project[];
  onProjectClick?: (projectId: string) => void;
  activeProjectId?: string;
}

const createCustomIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${isActive ? '40px' : '32px'};
        height: ${isActive ? '40px' : '32px'};
        background: ${isActive ? '#ffffff' : '#4a4a4a'};
        border: ${isActive ? '2px solid #ffffff' : '2px solid #6a6a6a'};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
      ">
        <svg width="${isActive ? '20px' : '16px'}" height="${isActive ? '20px' : '16px'}" viewBox="0 0 24 24" fill="${isActive ? '#1a1a1a' : '#e5e5e5'}">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [isActive ? 40 : 32, isActive ? 40 : 32],
    iconAnchor: [isActive ? 20 : 16, isActive ? 40 : 32],
    popupAnchor: [0, -32],
  });
};

export default function ProjectMap({ projects, onProjectClick, activeProjectId }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [30.63, 104.07],
      zoom: 13,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    projects.forEach((project) => {
      const isActive = project.id === activeProjectId;
      const marker = L.marker(project.coordinates, {
        icon: createCustomIcon(isActive),
      }).addTo(map);

      marker.bindPopup(`
        <div style="
          font-family: 'Cormorant Garamond', 'Noto Serif SC', serif;
          padding: 12px;
          min-width: 180px;
          background: #242424;
          border: 1px solid #4a4a4a;
        ">
          <h3 style="
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
          ">${project.title}</h3>
          <p style="
            margin: 0 0 4px 0;
            font-size: 13px;
            color: #888888;
          ">${project.location}</p>
          <p style="
            margin: 0;
            font-size: 12px;
            color: #a0a0a0;
          ">${project.type} · ${project.year}</p>
        </div>
      `, {
        closeButton: false,
        offset: [0, -10],
      });

      marker.on('click', () => {
        if (onProjectClick) {
          onProjectClick(project.id);
        }
      });

      marker.on('mouseover', function(this: L.Marker) {
        this.openPopup();
      });

      marker.on('mouseout', function(this: L.Marker) {
        this.closePopup();
      });

      markersRef.current.push(marker);
    });

    if (activeProjectId) {
      const activeProject = projects.find(p => p.id === activeProjectId);
      if (activeProject) {
        map.setView(activeProject.coordinates, 15, { animate: true });
      }
    }
  }, [projects, activeProjectId, onProjectClick]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
