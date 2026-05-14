import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, projects } from '../data/projects';
import ProjectMap from '../components/ProjectMap';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">项目未找到 | PROJECT NOT FOUND</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-[#1a1a1a] font-medium hover:bg-[#f0f0f0] transition-colors"
          >
            返回首页 | RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#4a4a4a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#888888] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm tracking-wider">返回 | BACK</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center font-bold text-lg text-white">
              丁
            </div>
            <div>
              <h1 className="text-lg font-medium tracking-wider">丁玮 | DING WEI</h1>
              <p className="text-xs text-[#6a6a6a] tracking-widest">建筑设计 | ARCHITECTURE</p>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative h-[60vh]">
          <div className="absolute inset-0 bg-[#242424]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4a4a4a] rounded-full blur-3xl" />
            </div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 text-sm font-medium border border-[#5a5a5a] text-[#a0a0a0]">
                  {project.type}
                </span>
                <span className="text-[#6a6a6a] text-sm">{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                {project.title}
              </h1>
              <div className="flex items-center gap-2 text-[#888888]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{project.location}, Chengdu</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-light mb-6 tracking-wider">项目概述 | PROJECT OVERVIEW</h2>
                <p className="text-[#a0a0a0] text-lg leading-relaxed mb-2">
                  {project.details}
                </p>
                <p className="text-[#6a6a6a] text-base leading-relaxed">
                  {project.type === '居住建筑' ? 'This residential design project located in Yifeng Garden area emphasizes the balance between community shared spaces and private living...' :
                   project.type === '城市设计' ? 'The Gaopan Road urban design project focuses on street space activation and community vitality enhancement...' :
                   project.type === '城市更新' ? 'The Yulin Road urban renewal project preserves historical texture while injecting new functions and vitality...' :
                   'The Sichuan University library design integrates tradition and modernity, creating a space for knowledge sharing...'}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light mb-6 tracking-wider">设计理念 | DESIGN PHILOSOPHY</h2>
                <div className="bg-[#242424] border border-[#4a4a4a] p-8">
                  <p className="text-[#a0a0a0] leading-relaxed mb-2">
                    本项目在设计过程中始终坚持以人为本的原则，充分考虑使用者的需求与行为模式。通过对场地文脉的深入分析，我们将地域特色与现代建筑语言有机融合，创造出既有文化认同感又具时代特征的空间体验。
                  </p>
                  <p className="text-[#6a6a6a] leading-relaxed">
                    Throughout the design process, we adhere to people-oriented principles, fully considering user needs and behavioral patterns. Through in-depth analysis of site context, we integrate regional characteristics with modern architectural language.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light mb-6 tracking-wider">项目特色 | FEATURES</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                    <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2 text-white">功能布局 | FUNCTIONAL LAYOUT</h3>
                    <p className="text-sm text-[#6a6a6a]">科学合理的空间组织，满足多元化使用需求</p>
                  </div>
                  <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                    <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2 text-white">绿色可持续 | SUSTAINABILITY</h3>
                    <p className="text-sm text-[#6a6a6a]">践行绿色建筑理念，降低能耗保护环境</p>
                  </div>
                  <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                    <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2 text-white">在地文化 | LOCAL CULTURE</h3>
                    <p className="text-sm text-[#6a6a6a]">融入地域特色，传承历史文脉</p>
                  </div>
                  <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                    <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-2 text-white">技术创新 | TECHNOLOGY</h3>
                    <p className="text-sm text-[#6a6a6a]">运用先进技术手段，提升建筑品质</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                <h3 className="font-medium mb-4 tracking-wider">项目信息 | PROJECT INFO</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#4a4a4a]">
                    <span className="text-[#6a6a6a]">项目名称 | NAME</span>
                    <span className="text-[#e5e5e5]">{project.title}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#4a4a4a]">
                    <span className="text-[#6a6a6a]">项目类型 | TYPE</span>
                    <span className="text-[#e5e5e5]">{project.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#4a4a4a]">
                    <span className="text-[#6a6a6a]">项目地点 | LOCATION</span>
                    <span className="text-[#e5e5e5]">{project.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#4a4a4a]">
                    <span className="text-[#6a6a6a]">完成年份 | YEAR</span>
                    <span className="text-[#e5e5e5]">{project.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#6a6a6a]">建筑面积 | AREA</span>
                    <span className="text-[#e5e5e5]">12,500 m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#242424] border border-[#4a4a4a] overflow-hidden">
                <div className="h-64">
                  <ProjectMap projects={[project]} />
                </div>
              </div>

              <div className="bg-[#242424] border border-[#4a4a4a] p-6">
                <h3 className="font-medium mb-4 tracking-wider">位置 | LOCATION</h3>
                <p className="text-sm text-[#6a6a6a] mb-4">
                  {project.location}, Chengdu, China
                </p>
                <p className="text-xs text-[#5a5a5a] font-mono">
                  {project.coordinates[0].toFixed(4)}, {project.coordinates[1].toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 bg-[#242424]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-light mb-8 tracking-wider">其他项目 | OTHER PROJECTS</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate(`/project/${prevProject.id}`)}
                className="group bg-[#1a1a1a] border border-[#4a4a4a] hover:border-white p-6 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center group-hover:border-white transition-colors">
                    <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#6a6a6a] mb-1">上一个 | PREVIOUS</p>
                    <h3 className="font-medium text-[#e5e5e5] group-hover:text-white transition-colors">{prevProject.title}</h3>
                  </div>
                </div>
              </button>
              <button
                onClick={() => navigate(`/project/${nextProject.id}`)}
                className="group bg-[#1a1a1a] border border-[#4a4a4a] hover:border-white p-6 transition-colors text-left"
              >
                <div className="flex items-center justify-end gap-4">
                  <div>
                    <p className="text-sm text-[#6a6a6a] mb-1 text-right">下一个 | NEXT</p>
                    <h3 className="font-medium text-[#e5e5e5] group-hover:text-white transition-colors">{nextProject.title}</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#3a3a3a] border border-[#5a5a5a] flex items-center justify-center group-hover:border-white transition-colors">
                    <svg className="w-6 h-6 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
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
