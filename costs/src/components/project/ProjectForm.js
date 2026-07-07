function ProjectForm() {
    return(
        <form>
            <div>
                <input type="text" placeholder="Insira o nome do projeto"></input>
            </div>
            <div>
                <input type="number" placeholder="Insira o orçamento total"></input>
            </div>
            <div>
                <select name="category_id"></select>
                <option disabled>Selecione a categoria</option>
            </div>
            <div>
                <input type="submit" value="Criar projeto"></input>
            </div>
        </form>
    )
}

export default ProjectForm