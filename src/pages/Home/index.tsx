import { MainSectionTitle } from "../../components/MainSectionTitle";
import { MainSectionCatalog } from "../../components/MainSectionCatalog";
import { MainSectionAboutUs } from "../../components/MainSectionAboutUs";
import { MainSectionProductSelection } from "../../components/MainSectionProductSelection";
import { MainSectionTeam } from "../../components/MainSectionTeam";
import { MainSectionFaq } from "../../components/MainSectionFaq";
import { MainSectionContacts } from "../../components/MainSectionContacts";
import { MainSectionQuestionsForm } from "../../components/SectionQuestionsForm";

export const Home = () => {
  return (
    <>
      <MainSectionTitle />
      <MainSectionCatalog />
      <MainSectionAboutUs />
      <MainSectionProductSelection />
      <MainSectionTeam />
      <MainSectionFaq />
      <MainSectionContacts />
      <MainSectionQuestionsForm />
    </>
  );
};
