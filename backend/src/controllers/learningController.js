import LearningAgent from "../services/agent.js";


const getLearningPath = async (req, res) => {
    const agent = new LearningAgent();
    const { query } = req.body;
    console.log("Received query:", query);
    
    const result = await agent.execute(query);
    console.log("Generated learning path:", result);
    res.json(result);
};

export default getLearningPath;