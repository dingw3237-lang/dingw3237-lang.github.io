import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative overflow-hidden cursor-pointer
        bg-[#242424] border border-[#4a4a4a]
        transition-all duration-300 ease-out
        ${isActive ? 'border-white' : 'hover:border-white'}
      `}
    >
      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium border border-[#4a4a4a] text-[#a0a0a0]">
            {project.type}
          </span>
          <span className="text-sm text-[#888888]">
            {project.year}
          </span>
        </div>

        <h3 className="text-xl font-medium text-white mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-[#888888] mb-4">
          {project.location}
        </p>

        <p className="text-sm text-[#a0a0a0] leading-relaxed flex-1 opacity-80 group-hover:opacity-100 transition-opacity mb-2">
          {project.description}
        </p>
        <p className="text-xs text-[#6a6a6a] leading-relaxed flex-1">
          {project.type === '居住建筑' ? 'Residential Architecture' : 
           project.type === '城市设计' ? 'Urban Design' : 
           project.type === '城市更新' ? 'Urban Renewal' : 'Cultural Architecture'}
        </p>

        <div className="mt-4 pt-4 border-t border-[#4a4a4a] flex items-center justify-between">
          <span className="text-xs text-[#6a6a6a]">查看详情 | VIEW DETAILS</span>
          <svg
            className="w-5 h-5 text-[#6a6a6a] group-hover:text-white group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
