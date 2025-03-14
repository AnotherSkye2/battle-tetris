export default function extractDifficultyFromName(botName) {
    const match = botName.match(/\((Easy|Medium|Hard)\)/);
    if (match) {
        return match[1];  
    }
    return null;  
}