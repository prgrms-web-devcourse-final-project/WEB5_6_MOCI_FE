"use client";
import Button from "@/shared/components/Button";
import TipTap from "./TipTap";
import { useState } from "react";

function WriteForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState({});
  const [category, setCategory] = useState("");
  const [fileIds, setFileIds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // if (isLoading) return;
    // setIsLoading(true);
    console.log(title, category, description);

    {
      /*try {
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/archive/public",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "",
            description: "",
            category: "",
            subCategory: "",
            fileIds: [],
          }),
        }
      );
    } catch (error) {}*/
    }
  };

  return (
    <>
      <main onSubmit={handleSubmit}>
        <select
          defaultValue="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="select">카테고리 선택</option>
          <option value="KAKAO_TALK">카카오톡</option>
          <option value="YOUTUBE">유튜브</option>
          <option value="KTX">기차</option>
          <option value="INTERCITY_BUS">버스</option>
          <option value="BAEMIN">배달</option>
          <option value="COUPANG">쿠팡</option>
        </select>

        <input type="file" multiple name="" id="" />

        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // 엔터 막기
          required
        />
        <TipTap onChange={(value) => setDescription(value)} />
        <Button type="button" onClick={handleSubmit} aria-disabled={isLoading}>
          {isLoading ? "처리중..." : "글 작성하기"}
        </Button>
      </main>
    </>
  );
}

export default WriteForm;
