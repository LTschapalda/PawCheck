type CategoryCardProps = {
    image : string,
    categoryTitle : string
}
export default function CategoryCard(props: CategoryCardProps) {
    return (
        <div>
            <div className="categoryFrame">
                <img src={props.image} alt="icon"/>
            </div>
            <p className="categorieTitle">{props.categoryTitle}</p>
        </div>

    )
}