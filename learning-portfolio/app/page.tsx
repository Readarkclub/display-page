import SkipLink from './components/SkipLink';
import NavigationBar from './components/NavigationBar';
import HeroEditorial from './components/HeroEditorial';
import ProjectsSection from './components/ProjectsSection';
import LearningSectionPretext from './components/LearningSectionPretext';
// ★ 杂志级编辑排版引擎
import EditorialEngine from './components/EditorialEngine';
import FooterSection from './components/FooterSection';

export default function Home() {
  return (
    <>
      <SkipLink />
      <NavigationBar />
      <main id="main-content">
        {/* ══ Pretext 驱动: 零CLS + Shrinkwrap + 打字机动画 ══ */}
        <HeroEditorial />
        
        {/* ══ ★★★ Editorial Engine — 杂志级编辑排版引擎 ══ */}
        {/* 多栏文本流 + 动态光球绕排 + 首字下沉 + 引用块 */}
        <EditorialEngine />
        
        <ProjectsSection />
        <LearningSectionPretext />
        <FooterSection />
      </main>
    </>
  );
}
