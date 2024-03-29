"use client";

import { db, storage } from "@/firebase.config";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { resizeImage } from "@/utils/imageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Article() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState<File | null>(null);

  const { user } = useUser();
  const router = useRouter();
  const handleArticleFormSubmit = async (e: any) => {
    // , `${user?.id}`, "Files"
    e.preventDefault();
    const docRef = await addDoc(collection(db, "Articles"), {
      userId: user?.id,
      FirstName: user?.firstName,
      FullName: user?.fullName,
      ProfileImage: user?.imageUrl,
      Articletitle: title,
      ArticleDescription: description,
      timeStamps: serverTimestamp(),
    });

    console.log(`document id : ${docRef.id}`);

    const fileRef = await ref(storage, `${docRef.id}`);

    if (!file) return;

    uploadBytes(fileRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(fileRef);
      console.log("Image Uploaded");

      await updateDoc(doc(db, "Articles", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast("File Uploaded Successfully");
    router.push("/");
  };

  const handTitleInput = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value);
  };

  const handleFileInput = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const renamedFile = renameFile(file, "newFileName"); // Replace 'newFileName' with the desired name

        const resizedFile = await resizeImage(file, 800, 600, 0.8);
        setFile(resizedFile);
      } catch (error) {
        console.error("Error handling file:", error);
      }
    }
    // setFile(e.target.files[0]);
  };

  const renameFile = (file: File, newName: string): File => {
    const renamed = new File([file], newName, { type: file.type });
    return renamed;
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 bg-[#800080]">
      <form action="" className="flex flex-col gap-8">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Your Title"
          className="border-gray-300 border-[2px] h-10 pl-6  placeholder:text-sm placeholder:text-green-200 bg-[#8A2BE2] text-[#FFA500]"
          onChange={handTitleInput}
        />

        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="Description"
          className="border-gray-300 border-[2px] pl-6 placeholder:text-sm placeholder:text-green-200 bg-[#8A2BE2] text-[#FFA500]"
          onChange={handleDescriptionInput}
        />

        {/* Image Picker */}

        <div className="flex justify-center items-center flex-col lg:flex-row">
          <input type="file" name="" id="" onChange={handleFileInput} />

          <div className="h-64 w-64 rounded-md">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="rounded-md bg-red-400 h-full w-full"
              />
            )}
          </div>
        </div>

        <button
          onClick={handleArticleFormSubmit}
          className="p-2 bg-black text-white w-full shadow-xl rounded-sm font-medium
          hover:text-green-400 
          "
        >
          <ToastContainer />
          Post Article
        </button>

        {/* Toast */}
        {/* <button onClick={notify}>Notify!</button> */}
      </form>
    </div>
  );
}

export default Article;
