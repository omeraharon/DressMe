import "./RouteTitle.css";

interface RouteTitleProps {
    title: string;
}

const RouteTitle: React.FC<RouteTitleProps> = ({ title }) => {
    return <h1 className="route-title">{title || ""}</h1>;
};

export default RouteTitle;
