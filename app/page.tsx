import SkipLink from './components/SkipLink';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import LearningSection from './components/LearningSection';
import FooterSection from './components/FooterSection';

export default function Home() {
  return (
    <>
      <SkipLink />
      <NavigationBar />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <LearningSection />
        <FooterSection />
      </main>
    </>
  );
}
