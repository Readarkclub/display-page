import SkipLink from './components/SkipLink';
import HeroSectionV2 from './components/HeroSectionV2';
import ProjectsSectionV2 from './components/ProjectsSectionV2';
import LearningSectionV2 from './components/LearningSectionV2';
import FooterSectionV2 from './components/FooterSectionV2';

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <HeroSectionV2 />
        <ProjectsSectionV2 />
        <LearningSectionV2 />
        <FooterSectionV2 />
      </main>
    </>
  );
}
