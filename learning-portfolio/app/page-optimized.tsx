import SkipLink from './components/SkipLink';
import HeroSectionOptimized from './components/HeroSectionOptimized';
import ProjectsSectionOptimized from './components/ProjectsSectionOptimized';
import LearningSectionOptimized from './components/LearningSectionOptimized';
import FooterSectionOptimized from './components/FooterSectionOptimized';

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <HeroSectionOptimized />
        <ProjectsSectionOptimized />
        <LearningSectionOptimized />
        <FooterSectionOptimized />
      </main>
    </>
  );
}
