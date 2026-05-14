import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectMap from '../components/ProjectMap';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const navigate = useNavigate();
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleCardClick = (projectId: string) => {
    setActiveProjectId(projectId);
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#4a4a4a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center font-bold text-lg text-white">
              丁
            </div>
            <div>
              <h1 className="text-lg font-medium tracking-wider">丁玮 | DING WEI</h1>
              <p className="text-xs text-[#6a6a6a] tracking-widest">建筑设计作品集 | ARCHITECTURE PORTFOLIO</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm text-[#888888] hover:text-white transition-colors tracking-wider">项目 | PROJECTS</a>
            <a href="#about" className="text-sm text-[#888888] hover:text-white transition-colors tracking-wider">关于 | ABOUT</a>
            <a href="#contact" className="text-sm text-[#888888] hover:text-white transition-colors tracking-wider">联系 | CONTACT</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <ProjectMap
              projects={projects}
              activeProjectId={activeProjectId}
              onProjectClick={handleProjectClick}
            />
          </div>

          <div className="absolute top-24 left-6 md:left-12 z-[1000] max-w-md">
            <div className="bg-[#242424]/95 backdrop-blur-md border border-[#4a4a4a] p-8">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
                你好，我是 <span className="text-white">丁玮</span>
              </h2>
              <p className="text-[#a0a0a0] text-lg leading-relaxed mb-2">
                一名专注于城市建筑与空间设计的建筑师。
              </p>
              <p className="text-[#888888] text-base leading-relaxed mb-6">
                An architect focused on urban architecture and spatial design.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-white text-[#1a1a1a] font-medium hover:bg-[#f0f0f0] transition-colors"
                >
                  查看项目 | VIEW PROJECTS
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-[#5a5a5a] hover:border-white text-[#e5e5e5] font-medium transition-colors"
                >
                  联系我 | CONTACT ME
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] animate-bounce">
            <svg className="w-6 h-6 text-[#6a6a6a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <section id="projects" className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">精选作品 | SELECTED WORKS</h2>
              <p className="text-[#a0a0a0] max-w-2xl mx-auto mb-2">
                每一个项目都是一次对空间、人与城市关系的深度探索
              </p>
              <p className="text-[#6a6a6a] max-w-2xl mx-auto">
                Each project represents an exploration of the relationship between space, people, and the city
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isActive={project.id === activeProjectId}
                  onClick={() => handleCardClick(project.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 px-6 md:px-12 bg-[#242424]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wider">关于我 | ABOUT</h2>
                <div className="space-y-4">
                  <p className="text-[#a0a0a0] leading-relaxed mb-1">
                    丁玮，建筑学硕士，国家一级注册建筑师。现就职于成都市建筑设计研究院，专注于城市更新、公共建筑与居住建筑的设计与研究。
                  </p>
                  <p className="text-[#6a6a6a] leading-relaxed mb-4">
                    Ding Wei, Master of Architecture, National First-Class Registered Architect. Currently working at Chengdu Architectural Design and Research Institute, focusing on urban renewal, public architecture, and residential building design and research.
                  </p>
                  <p className="text-[#a0a0a0] leading-relaxed mb-1">
                    我的设计理念是将功能性与美学完美结合，关注建筑与城市文脉的对话，追求可持续发展的设计原则。每个项目我都力求创造出既满足使用者需求，又能回应场地精神的空间体验。
                  </p>
                  <p className="text-[#6a6a6a] leading-relaxed mb-4">
                    My design philosophy is to perfectly integrate functionality and aesthetics, focusing on the dialogue between architecture and urban context, pursuing sustainable design principles.
                  </p>
                  <p className="text-[#a0a0a0] leading-relaxed mb-1">
                    多年的实践让我积累了丰富的项目经验，从小型社区空间到大型城市综合体，我始终保持着对建筑的热爱与敬畏之心。
                  </p>
                  <p className="text-[#6a6a6a] leading-relaxed">
                    Years of practice have given me rich project experience. From small community spaces to large-scale urban complexes, I have always maintained a passion and respect for architecture.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] border border-[#4a4a4a] p-6 text-center">
                  <div className="text-4xl font-light text-white mb-1">12+</div>
                  <div className="text-sm text-[#a0a0a0]">完成项目</div>
                  <div className="text-xs text-[#6a6a6a]">PROJECTS</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#4a4a4a] p-6 text-center">
                  <div className="text-4xl font-light text-white mb-1">8</div>
                  <div className="text-sm text-[#a0a0a0]">年经验</div>
                  <div className="text-xs text-[#6a6a6a]">YEARS</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#4a4a4a] p-6 text-center">
                  <div className="text-4xl font-light text-white mb-1">3</div>
                  <div className="text-sm text-[#a0a0a0]">获奖作品</div>
                  <div className="text-xs text-[#6a6a6a]">AWARDS</div>
                </div>
                <div className="bg-[#1a1a1a] border border-[#4a4a4a] p-6 text-center">
                  <div className="text-4xl font-light text-white mb-1">成都</div>
                  <div className="text-sm text-[#a0a0a0]">工作地点</div>
                  <div className="text-xs text-[#6a6a6a]">LOCATION</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wider">联系我 | CONTACT</h2>
            <p className="text-[#a0a0a0] mb-2">
              有合作意向或想了解更多信息？欢迎与我联系
            </p>
            <p className="text-[#6a6a6a] mb-12">
              Interested in collaboration or want to know more? Feel free to get in touch
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="mailto:dingwei@example.com"
                className="flex items-center gap-3 px-8 py-4 bg-[#242424] border border-[#4a4a4a] hover:border-white transition-colors w-full md:w-auto justify-center"
              >
                <svg className="w-5 h-5 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[#e5e5e5]">dingwei@example.com</span>
              </a>
              <a
                href="tel:+8613800000000"
                className="flex items-center gap-3 px-8 py-4 bg-[#242424] border border-[#4a4a4a] hover:border-white transition-colors w-full md:w-auto justify-center"
              >
                <svg className="w-5 h-5 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-[#e5e5e5]">+86 138 0000 0000</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 md:px-12 border-t border-[#4a4a4a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6a6a6a]">
            © 2024 丁玮 | DING WEI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#6a6a6a] hover:text-white transition-colors tracking-wider">微信 | WECHAT</a>
            <a href="#" className="text-sm text-[#6a6a6a] hover:text-white transition-colors tracking-wider">微博 | WEIBO</a>
            <a href="#" className="text-sm text-[#6a6a6a] hover:text-white transition-colors tracking-wider">小红书 | XHS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
