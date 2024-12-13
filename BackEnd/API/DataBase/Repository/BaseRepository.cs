using API.DataBase.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.DataBase.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {

        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;
        private readonly IMapper? _mapper;

        public BaseRepository(AppDbContext database)
        {
            _context = database;
            _dbSet = database.Set<T>();
        }

        public BaseRepository(AppDbContext database, IMapper mapper)
        {

            _context = database;
            _dbSet = database.Set<T>();
            _mapper = mapper;
        }


        public async Task<T> AddWithDto<CreateDTO>(CreateDTO Dto)
        {
            if (_mapper is null) throw new Exception($"The Mapper in {nameof(AddWithDto)} is null");

            T entity = _mapper.Map<T>(Dto);

            T entityCreated = await Add(entity);

            return entityCreated;
        }


        public async Task<T> Add(T entity)
        {
            try
            {
                var response = await _dbSet.AddAsync(entity);

                await _context.SaveChangesAsync();

                return response.Entity;
            }
            catch (DbUpdateException dbEx)
            {
                throw new InvalidOperationException("Error creating entity in the database, ", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception("An unexpected error occurred while creating the entity, ", ex);
            }

        }

        public async Task Delete(T entity)
        {
            _dbSet.Remove(entity);

            await _context.SaveChangesAsync();
        }

        public async Task<T?> GetById(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            return entity;
        }

        public async Task<List<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {

            IQueryable<T> query = _dbSet;

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();

        }

        public async Task Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
    }
}
