

const convertPrice = (price) => {
    try {
        return (price)?.toLocaleString()?.replaceAll(',', '.');
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default convertPrice;