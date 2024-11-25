import React from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const KnowledgeCard = () => {
  return (
    <div className="body w-full my-8 border p-4 rounded-lg">
      <div className="header w-full flex items-center">
        <div className="">
          <h1 className="text-3xl font-semibold">What is Rest API?</h1>

          <div className="flex items-center">
            <div className="w-5 h-5 hover:border-2 border-black bg-red-700 mx-1 p-2 flex justify-center rounded-full items-center text-xs">
              M
            </div>
            <p className="text-sm">Karan Khan</p>
          </div>
        </div>
      </div>

      <div className="my-4">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
          nesciunt blanditiis. Laudantium molestias cum ratione culpa,
          consectetur dicta, illo incidunt voluptatem architecto in
          reprehenderit quaerat dolorum dolore repellendus aliquam
          necessitatibus minus. Quasi vitae tempora illum nihil, eius explicabo
          delectus dolorum facere, quam, expedita pariatur adipisci dolorem! Rem
          veritatis repudiandae molestias necessitatibus dicta dolorem officia
          accusamus nobis voluptatum aliquid fugiat iusto, dolore odio, soluta
          repellat consequuntur rerum nulla inventore? Molestias veniam aliquam,
          ea, amet sint, quae in eaque similique accusamus eum dolorum quis odit
          molestiae corporis ipsum impedit quasi. Vel doloremque dolor eligendi
          excepturi dolorem ipsa quidem omnis quis ipsum ducimus? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Id pariatur mollitia ipsa
          minus placeat eum ex atque vel doloribus voluptas, facere quo sint
          repellendus enim eius, magnam nulla! A vitae, corrupti iure, illum
          dicta id placeat in distinctio rerum repudiandae quia architecto
          minima nisi ducimus perferendis laudantium! Cumque maxime illum
          reiciendis nesciunt! Quisquam dicta saepe repellendus officiis debitis
          ea accusantium ipsum! Minima culpa dicta voluptas nesciunt quod, ea
          quos beatae inventore soluta minus itaque saepe ad voluptatem veniam.
          Repellat consectetur deserunt hic labore quam asperiores delectus enim
          sapiente quibusdam, voluptatum magnam aspernatur porro nesciunt eos
          vero? At possimus eveniet numquam.
        </p>
        <button className="text-sm text-blue-500">Show more</button>
      </div>

      <div className="w-full flex justify-between mt-6">
        <div className="flex">
          <button className="flex items-center justify-center hover:bg-slate-200 rounded-full p-1">
            <BiLike className="inline mr-1 w-6 h-6" />
            220
          </button>
          <button className="flex items-center justify-center mx-4 hover:bg-slate-200 rounded-full p-1">
            <FaRegComment className="inline mr-1 w-6 h-6" />
            22
          </button>
        </div>
        <p>23 October 2024</p>
      </div>
    </div>
  );
};

export default KnowledgeCard;
