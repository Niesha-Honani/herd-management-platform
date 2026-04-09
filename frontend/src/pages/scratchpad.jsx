<label htmlFor='animal-filter-herd'>Filter by herd</label>
            <select 
                id="animal-filter-herd"
                value={herdId}
                onChange={(e) => setHerdId(e.target.value)}
            >
                <option value="">All Herds</option>
                {herds.map((herd) => (
                    <option key={herd.id} value={herd.id}>
                        {herd.name}
                    </option>
                ))}
            </select>