import misinfoCheckFunc from "../scrapping/misinfo_check.js";

export const getMisinfo = async (req, res) => {
    try {
        const { text } = req.body;
        const result = await misinfoCheckFunc(text);
        console.log(result);
        
        res.status(200).json({ status: 'success', result: result });

    } catch (error) {
        console.error('Error fetching misinformation:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};