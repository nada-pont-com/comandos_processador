import simpleGit from "simple-git";


function init(camihno) {
  return simpleGit(camihno);
}


export async function diferenca(caminho) {
  const git = init(caminho);

  const { current } = await git.branchLocal();


  const result = await git.raw(['rev-list', '--count', `${current}..origin/${current}`]);

  return parseInt(result.trim());
}

export async function pull(caminho) {
  const git = init(caminho);
  try {
    await git.reset('hard');
    const pull = await git.pull();

    return pull.summary;

  } catch (error) {
    console.log(error)
  }

  // const result = await git.raw(['rev-list', '--count', `${current}..origin/${current}`]);

  // return parseInt(result.trim());
}


export const git_comandos = { pull, diferenca }