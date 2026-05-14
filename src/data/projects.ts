export interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  coordinates: [number, number];
  year: string;
  description: string;
  images: string[];
  details: string;
}

export const projects: Project[] = [
  {
    id: 'residential',
    title: '居住区设计',
    type: '居住建筑',
    location: '怡丰花园',
    coordinates: [30.6251, 104.0668],
    year: '2023',
    description: '现代简约风格的居住区设计，注重人与自然的和谐共处',
    images: [],
    details: '本项目位于成都市怡丰花园片区，设计理念强调社区共享空间与私密居住的平衡。整体规划采用组团式布局，通过绿化走廊串联各个功能区块。建筑立面采用暖色调材料，营造温馨的居住氛围。景观设计融入成都地域特色，设置了多处休闲广场和儿童活动空间，旨在打造一个生态宜居的现代化社区。'
  },
  {
    id: 'urban',
    title: '城市设计',
    type: '城市设计',
    location: '高攀路',
    coordinates: [30.6312, 104.0885],
    year: '2022',
    description: '城市更新与公共空间活化设计',
    images: [],
    details: '高攀路城市设计项目聚焦于街道空间的活化与社区活力的提升。设计策略包括：优化步行系统，扩宽人行道并设置休憩设施；增加街道绿化密度，种植本土植物品种；重新规划沿街商业界面，打造连续的活力界面；引入艺术装置和文化元素，提升街道的识别性和文化内涵。'
  },
  {
    id: 'renewal',
    title: '城市更新',
    type: '城市更新',
    location: '玉林路',
    coordinates: [30.6457, 104.0563],
    year: '2021',
    description: '历史街区的保护性更新与文化传承',
    images: [],
    details: '玉林路城市更新项目在保留历史肌理的同时，注入新的功能与活力。设计遵循"保护为主、活化利用"的原则，对原有建筑进行修缮加固，保留具有历史价值的建筑元素。同时引入文创产业、特色餐饮等新业态，让老街区焕发新生。巷道空间得到优化，增加了夜间照明和艺术装置，使其成为展示成都文化的新窗口。'
  },
  {
    id: 'library',
    title: '大学图书馆',
    type: '文化建筑',
    location: '四川大学望江校区',
    coordinates: [30.6334, 104.0892],
    year: '2024',
    description: '现代校园文化地标建筑',
    images: [],
    details: '四川大学望江校区图书馆设计融合传统与现代，创造知识共享的空间。建筑设计取意于"竹简"与"书卷"，立面采用参数化设计的遮阳百叶，形成有韵律的光影效果。内部空间采用开放式布局，设置多种学习区域满足不同需求。屋顶设置光伏发电系统，实现绿色建筑目标。建筑与校园环境和谐对话，成为师生喜爱的知识殿堂。'
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
