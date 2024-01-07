import { db } from "@/firebase.config";
import { auth, useUser } from "@clerk/nextjs";
import { DocumentData, collection, getDocs } from "firebase/firestore";

const HomePage = async () => {
  const { userId } = auth();
  let ArticleArray: DocumentData[] = [];
  // , userId!, "Files"

  if (!userId) return;
  const querySnapshot = await getDocs(collection(db, "Articles"));

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    ArticleArray.push(doc.data());
  });

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-8 lg:w-[35rem] lg:h-[35rem]">
      {ArticleArray.map((article) => (
        <div key={article.userId} className="">
          <div className="flex justify-between p-8">
            <div className="flex space-x-4 lg:space-x-10">
              <img
                src={article.ProfileImage}
                alt=""
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="font-serif">{article.FullName}</p>

                <p className="italic text-xs">{article.Articletitle}</p>
              </div>
            </div>

            <p>9:00</p>
          </div>
          <div className="">
            {/* <p className="font-bold text-xl ">{article.Articletitle}</p> */}
            <p className="bg-yellow-500 text-black p-2 font-medium text-sm">
              {article.ArticleDescription}
            </p>
            <img src={article.downloadURL} alt="" className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
