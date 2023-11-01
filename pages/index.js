import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ImageEditor from "@app/components/ImageEditor";

export default function Home(props) {
  return (
    <div>
      <div>123</div>
      <div className="wrapper">
          <ImageEditor config={{mime_types: ['image/png', 'image/jpeg']}} />
      </div>
    </div>
  );
}


export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});
