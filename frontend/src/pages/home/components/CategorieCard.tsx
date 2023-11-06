type CategoryCardProps = {
    image : string,
    categoryTitle : string
}
export default function CategoryCard(props: CategoryCardProps) {
    return (
        <div className="categoryCard">
            <div className="categoryFrame">
                <img src={props.image} alt="icon"/>
            </div>
            <p className="categoryTitle">{props.categoryTitle}</p>
        </div>

    )
}