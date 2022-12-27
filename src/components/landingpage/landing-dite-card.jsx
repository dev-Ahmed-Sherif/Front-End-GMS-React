import abdo from "./style.module.css";

function LandingDiteCard() {
  return (
    <>
      <div className={abdo.row}>
        <div className={`${abdo.cols} ${abdo.b}`}>
          <div className={abdo.boxes}>
            <img src="./images/diet1.jpg" />
          </div>
        </div>
        <div className={`${abdo.cols} ${abdo.a}`}>
          <div className={abdo.heading}>Boiled Checken</div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
            error incidunt magni, dolorum aut expedita? Impedit possimus
            provident veniam, esse dolor eum eaque dolore quos quam ratione aut
            molestias alias dolorem ab, voluptatum atque tempora quasi, aliquid
            minima adipisci fuga! Hic aliquam sint eligendi, iusto deserunt
            accusantium voluptate, in inventore qui, adipisci nulla ut dicta vel
            atque! Dolores unde asperiores, possimus fugit voluptatem repellat.
            Maiores, hic. Modi sunt eos dolores sit blanditiis rerum. Fugiat
            labore blanditiis, distinctio odit iusto explicabo odio. Doloribus
            perferendis fuga maxime ad velit nisi commodi repellat, illum nihil
            magnam earum error iste distinctio similique, voluptas rem.
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingDiteCard;
