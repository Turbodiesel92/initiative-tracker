"""redo tables

Revision ID: 9fee4d0281b1
Revises: 
Create Date: 2023-05-24 11:27:32.478486

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fee4d0281b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('campaigns',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('campaign_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('non_player_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('npc_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('player_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pc_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('campaign_npcs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('campaign_id', sa.Integer(), nullable=True),
    sa.Column('npc_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], name=op.f('fk_campaign_npcs_campaign_id_campaigns')),
    sa.ForeignKeyConstraint(['npc_id'], ['non_player_characters.id'], name=op.f('fk_campaign_npcs_npc_id_non_player_characters')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('campaign_pcs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('campaign_id', sa.Integer(), nullable=True),
    sa.Column('pc_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], name=op.f('fk_campaign_pcs_campaign_id_campaigns')),
    sa.ForeignKeyConstraint(['pc_id'], ['player_characters.id'], name=op.f('fk_campaign_pcs_pc_id_player_characters')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('_password', sa.String(), nullable=True),
    sa.Column('campaign_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], name=op.f('fk_users_campaign_id_campaigns')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('campaign_pcs')
    op.drop_table('campaign_npcs')
    op.drop_table('player_characters')
    op.drop_table('non_player_characters')
    op.drop_table('campaigns')
    # ### end Alembic commands ###
