export async function getAddress(ip = '8.8.8.8') {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_e3KTqDdySXyouOVm5F6bQ9f60INnf&ipAddress=${ip}`)

    return await response.json();
}