export default function getProfileValue(profile) {
    let profileValue = 0;
    for (let i = 0; i < profile.length; i++) {
        if (profile[i] == 1) { profileValue += 1 } 
    }
    return profileValue
}