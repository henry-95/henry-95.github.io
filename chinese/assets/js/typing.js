
document.addEventListener("DOMContentLoaded", go);

async function go(){

	let waitTime = 1000;
	await typeSentence("Learn Mandarin.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("学习普通话.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("In a Virtual Classroom.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("在虚拟教室中.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("One-to-one, or group lessons.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("一对一或小组课程.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("Class is in session!.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));

	await typeSentence("上课了.", document.getElementById("typing-sentence"));
	await waitForMs(waitTime);
	await deleteSentence(document.getElementById("typing-sentence"));
	//await deleteSentence(document.getElementById("typing-sentence"));

}

async function typeSentence(sentence, eleRef, delay = 100)
{
	const letters = sentence.split("");
	let i = 0;
	while(i < letters.length){
		await waitForMs(delay);
		eleRef.append(letters[i]);
		i++;
	}
	return;
}

function waitForMs(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteSentence(eleRef)
{
	const sentence = eleRef.innerHTML;
	const letters = sentence.split("");

	let i = 0;
	while(letters.length > 0)
	{
		await waitForMs(50);
		letters.pop();
		eleRef.innerHTML = letters.join("");
	}
}